const bcrypt = require("bcryptjs"); // object for password hashing
const user = require("../models/usermodel"); // object of new user collection
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); // by default error catcher
const mongoose = require("mongoose");
const multer = require("multer");
const GridFSBucket = require("mongodb").GridFSBucket;
const User = require("../models/usermodel");
const moment=require("moment");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// require("dotenv").config();

const jwt = require("jsonwebtoken"); //object to Generate JWT token

// Registration for new user
exports.createUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const Email_Validation = await user.findOne({ email });

  if (Email_Validation) {
    return res
      .status(202)
      .json({ success: false, error: "Email_ID already exists" });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: error.message, success: false });
  }
});

//Login for User
exports.userLogin = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists in the database
    const user_details = await user.findOne({ email });

    if (!user_details) {
      // user Details not found, send error response

      return res
        .status(202)
        .json({ success: false, message: "Invalid Email_ID or password." });
    }

    // Check if user is banned
    if (user_details.banned_time) {
      const bannedUntil = moment(user_details.banned_time, "DD-MM-YYYY HH:mm:ss");
      const currentTime = moment();

      // If the current time is before the ban expiry, deny login
      if (currentTime.isBefore(bannedUntil)) {
        return res.status(203).json({
          success: false,
          message: `You are banned until ${bannedUntil.format("YYYY-MM-DD HH:mm:ss")}`,
        });
      }
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user_details.password);
    if (!passwordMatch) {
      // Passwords don't match, send error response
      return res
        .status(201)
        .json({ success: false, message: "Password is wrong" });
    }

    // const token = jwt.sign(
    //   { id: user_details._id, Email_ID: user_details.Email_ID }, // Payload data
    //   process.env.JWT_SECRET, // Secret key
    //   { expiresIn: "1h" } // Token expiry time (1 hour)
    // );
    res.status(200).json({
      success: true,
      message: "Login successful",
      //   token: token,
      user_details: user_details,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(200).json({ success: false, error: "Internal server error",message:`Error during login: ${error}` });
  }
});

exports.getUserInfo = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;
  try {
    const matched_data = await user.findOne({ email });

    if (!matched_data) {
      return res
        .status(202)
        .json({ success: false, message: "user data not found" });
    }

    return res.status(201).json({
      success: true,
      message: "user found successfully",
      data: matched_data,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(200).json({ success: false, error: "Internal server error" });
  }
});

exports.uploadProfileImage = async (req, res) => {
  const uploadMiddleware = upload.single("profile_image");

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(200).send(err.message);
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    console.log("Request body:", req.body); // Check if email is received
    console.log("Uploaded file:", req.file); // Check if file is received

    const { email } = req.body; // Identify user by email
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);
    const uploadStream = bucket.openUploadStream(req.file.originalname);

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      const fileId = uploadStream.id; // Get GridFS file ID

      // Update user profile with image ID
      const user = await User.findOneAndUpdate(
        { email: email },
        { profile_image_id: fileId }
      );

      if (!user) {
        return res
          .status(201)
          .json({ success: false, messsage: "user not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Profile image uploaded successfully.",
        image_id: fileId,
        data: user,
      });
    });

    uploadStream.on("error", (err) => {
      res.status(200).send("Error uploading image: " + err.message);
    });
  });
};
exports.getProfileImage = async (req, res) => {
  try {
    const { email } = req.query; // Use query params instead of req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.profile_image_id) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(user.profile_image_id)
    );

    res.set("Content-Type", "image/jpeg"); // Adjust based on actual image type
    downloadStream.pipe(res);

    downloadStream.on("error", (err) => {
      console.error("Error downloading file:", err);
      res.status(500).json({ message: "Error retrieving image" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
