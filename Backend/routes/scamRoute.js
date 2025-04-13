const express = require("express");
const asyncMiddleware = require("../middleware/catchAsyncErrors");
const {
  NewScamNews,
  voteCountForScamNews,
  getScamNewsSortedByhappened_int_count,
} = require("../controllers/trendingController");

const router = express.Router();

// create fake news
router.route("/tscam-create").post(asyncMiddleware(NewScamNews));

// if a user suffered with that scam
router.route("/happened-to-me").post(asyncMiddleware(voteCountForScamNews));

// fetching the fake news based on votes
router
  .route("/tscam-list")
  .get(asyncMiddleware(getScamNewsSortedByhappened_int_count));

module.exports = router;
