const express = require("express");
const asyncMiddleware = require("../middleware/catchAsyncErrors");
const {
  createUser,
  userLogin,
  getUserInfo,
  uploadProfileImage,
  getProfileImage,
} = require("../controllers/userController");

const router = express.Router();

// registration for User
router.route("/user-sign-up").post(asyncMiddleware(createUser));

//login for User
router.route("/user-sign-in").post(asyncMiddleware(userLogin));

//et user info route
router.route("/getuinfo").post(asyncMiddleware(getUserInfo));

//upload user porfile image
router.route("/upload-profile-image").post(asyncMiddleware(uploadProfileImage));

//get user porfile image
router.route("/get-profile-image").get(asyncMiddleware(getProfileImage));

module.exports = router;
