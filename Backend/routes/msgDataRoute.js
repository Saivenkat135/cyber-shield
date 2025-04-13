const express = require("express");
const {
  SaveMessageData,
  getMessageData,
} = require("../controllers/messageDataController");

const router = express.Router();

// messages saving route route
router.route("/pushmsg").post(SaveMessageData);

//messges retrieving route
router.route("/getmsg").post(getMessageData);

module.exports = router;
