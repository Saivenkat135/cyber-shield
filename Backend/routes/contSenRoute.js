const express = require("express");
const { contControl} = require("../controllers/contSenController");

const router = express.Router();

// chat route
router.route("/contsensor-text").post(contControl);

module.exports = router;
