const express = require("express");
const {
  uploadPostImage,
  getUserPostImages,
  getAllPosts
} = require("../controllers/socialMediaController");
const router = express.Router();

//route for saving of the image
router.route("/upload-image-post").post(uploadPostImage);

//route for getting image
router.route("/get-image-post").post(getUserPostImages);

//getting all posts
router.route("/get-all-posts").post(getAllPosts);

module.exports = router;
