const express = require("express");
const asyncMiddleware = require("../middleware/catchAsyncErrors");
const {
  NewFakeNews,
  voteCountForFakeNews,
  getFakeNewsSortedByhappened_int_count,
} = require("../controllers/trendingController");

const router = express.Router();

// create fake news
router.route("/tfake-create").post(asyncMiddleware(NewFakeNews));

// if a user suffered with that scam
router.route("/noticed-it").post(asyncMiddleware(voteCountForFakeNews));

// fetching the fake news based on votes
router
  .route("/tfake-list")
  .get(asyncMiddleware(getFakeNewsSortedByhappened_int_count));

module.exports = router;
