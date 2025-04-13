const express = require("express");
const { ImageContentSensor } = require("../controllers/imageSensorController");
const multer = require("multer");
const router = express.Router();

// chat route
const upload = multer({ dest: "uploads/" });

router
  .route("/contsensor-image")
  .post(upload.single("image"), ImageContentSensor);

module.exports = router;
