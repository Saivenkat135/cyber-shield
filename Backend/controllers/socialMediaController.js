const mongoose = require("mongoose");
const multer = require("multer");
const GridFSBucket = require("mongodb").GridFSBucket;
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const socialMedia = require("../models/socialMediaModel");
const User=require("../models/usermodel");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadPostImage = async (req, res) => {
  const uploadMiddleware = upload.single("image");

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { email, matter } = req.body; // Identify user by email

    try {
      const db = mongoose.connection.db;
      const bucket = new GridFSBucket(db);
      const uploadStream = bucket.openUploadStream(req.file.originalname);

      uploadStream.end(req.file.buffer);

      const Username=await User.findOne({email});
      if(!Username){
        return res.status(202).json({success:false,message:"User not found"});
      }

      uploadStream.on("finish", async () => {
        const fileId = uploadStream.id; // Get GridFS file ID

        // Save post details to MongoDB
        const social_media = new socialMedia({
          name:Username.name,
          email: email,
          matter: matter,
          image_id: fileId,
        });

        await social_media.save(); // Save to database

        return res.status(200).json({
          success: true,
          message: "Post image uploaded successfully.",
          image_id: fileId,
          data: social_media,
        });
      });

      uploadStream.on("error", (err) => {
        res.status(500).send("Error uploading image: " + err.message);
      });
    } catch (error) {
      console.error("Upload Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};
exports.getUserPostImages = async (req, res) => {
  try {
    const { email } = req.body; // Get email from query params

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find all posts by the user
    const posts = await socialMedia.find({ email });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);

    // Prepare array of image data
    const imagePromises = posts.map((post) => {
      return new Promise((resolve, reject) => {
        const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(post.image_id));
        const chunks = [];

        downloadStream.on("data", (chunk) => {
          chunks.push(chunk);
        });

        downloadStream.on("end", () => {
          const base64Image = Buffer.concat(chunks).toString("base64");
          resolve({
            filename: post.image_id, // Image ID as filename (or replace with actual filename if stored)
            matter: post.matter, // Matter from the database
            image: `data:image/jpeg;base64,${base64Image}`, // Convert to Base64 format
          });
        });

        downloadStream.on("error", (err) => {
          reject(err);
        });
      });
    });

    const images = await Promise.all(imagePromises);

    res.json({
      count: images.length,
      images,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {

    // Find all posts by the user
    const posts = await socialMedia.find();

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);

    // Prepare array of image data
    const imagePromises = posts.map((post) => {
      return new Promise((resolve, reject) => {
        const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(post.image_id));
        const chunks = [];

        downloadStream.on("data", (chunk) => {
          chunks.push(chunk);
        });

        downloadStream.on("end", () => {
          const base64Image = Buffer.concat(chunks).toString("base64");
          resolve({
            filename: post.image_id, // Image ID as filename (or replace with actual filename if stored)
            matter: post.matter, // Matter from the database
            image: `data:image/jpeg;base64,${base64Image}`, // Convert to Base64 format
          });
        });

        downloadStream.on("error", (err) => {
          reject(err);
        });
      });
    });

    const images = await Promise.all(imagePromises);

    res.json({
      count: images.length,
      images,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
