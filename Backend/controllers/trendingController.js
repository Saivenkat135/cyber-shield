const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fakenews = require("../models/fakenewsmodel");
const scam = require("../models/scammodel");

// New fake news upload
exports.NewFakeNews = catchAsyncErrors(async (req, res) => {
  const { headline, tcontent } = req.body;

  try {
    // Check if the headline already exists in the database
    const existingNews = await fakenews.findOne({ headline });

    if (existingNews) {
      // Ensure happened_int_count is a valid number before incrementing
      existingNews.happened_int_count =
        Number(existingNews.happened_int_count) || 0;
      existingNews.happened_int_count += 1;
      await existingNews.save();

      return res.status(200).json({
        success: true,
        message: "Headline already exists, count incremented",
        data: existingNews,
      });
    }

    // If headline doesn't exist, create a new news document
    const newFakenews = new fakenews({
      headline: headline,
      tcontent: tcontent,
      happened_int_count: 0, // Initial count for new fake news
    });

    await newFakenews.save();
    return res.status(201).json({
      success: true,
      message: "News saved successfully",
      data: newFakenews,
    });
  } catch (error) {
    console.error("Error during fake news upload:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
// New scam upload
exports.NewScamNews = catchAsyncErrors(async (req, res) => {
  const { headline, tcontent } = req.body;

  try {
    // Check if the headline already exists in the database
    const existingScamNews = await scam.findOne({ headline });

    if (existingScamNews) {
      // Increment the happened_int_count and save the document
      existingScamNews.happened_int_count += 1;
      await existingScamNews.save();

      return res.status(200).json({
        success: true,
        message: "Scam name already exists, count incremented",
        data: existingScamNews,
      });
    }

    // If headline doesn't exist, create a new scam news document
    const newScamNews = new scam({
      headline,
      tcontent,
      happened_int_count: 0, // Initial count for new scam news
    });

    await newScamNews.save();
    return res.status(201).json({
      success: true,
      message: "Scam news saved successfully",
      data: newScamNews,
    });
  } catch (error) {
    console.error("Error during scam news upload:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//vote count increment for fake news
exports.voteCountForFakeNews = catchAsyncErrors(async (req, res) => {
  const { headline } = req.body;

  if (!headline) {
    return res
      .status(400)
      .json({ success: false, error: "News name is required" });
  }

  try {
    // Increment happened_int_count using findOneAndUpdate
    const updatedNews = await fakenews.findOneAndUpdate(
      { headline },
      { $inc: { happened_int_count: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedNews) {
      return res.status(404).json({ success: false, error: "News not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vote count incremented successfully",
      happened_int_count: updatedNews.happened_int_count,
    });
  } catch (error) {
    console.error("Error updating vote count:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Vote count increment for scam news
exports.voteCountForScamNews = catchAsyncErrors(async (req, res) => {
  const { headline } = req.body;

  if (!headline) {
    return res
      .status(400)
      .json({ success: false, error: "Scam name is required" });
  }

  try {
    // Increment happened_int_count using findOneAndUpdate for scam news
    const updatedScamNews = await scam.findOneAndUpdate(
      { headline },
      { $inc: { happened_int_count: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedScamNews) {
      return res
        .status(404)
        .json({ success: false, error: "Scam news not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vote count incremented successfully",
      happened_int_count: updatedScamNews.happened_int_count,
    });
  } catch (error) {
    console.error("Error updating vote count:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Fetch all fake news sorted by vote count in descending order
exports.getFakeNewsSortedByhappened_int_count = catchAsyncErrors(
  async (req, res) => {
    try {
      // Fetch all fake news and sort by happened_int_count in descending order
      const fakeNewsList = await fakenews
        .find()
        .sort({ happened_int_count: -1 });

      res.status(200).json({
        success: true,
        message: "Fake news fetched and sorted by vote count successfully",
        data: fakeNewsList,
      });
    } catch (error) {
      console.error("Error fetching fake news:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

// Fetch all scam news sorted by vote count in descending order
exports.getScamNewsSortedByhappened_int_count = catchAsyncErrors(
  async (req, res) => {
    try {
      // Fetch all scam news and sort by happened_int_count in descending order
      const scamNewsList = await scam.find().sort({ happened_int_count: -1 });

      res.status(200).json({
        success: true,
        message: "Scam news fetched and sorted by vote count successfully",
        data: scamNewsList,
      });
    } catch (error) {
      console.error("Error fetching scam news:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);
