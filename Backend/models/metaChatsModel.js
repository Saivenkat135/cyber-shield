const mongoose = require("mongoose");

// New schema with an array of participant emails
const metachats = new mongoose.Schema({
  chat_id: Number,
  chat_name: String,
  participants : [String] // Array of participant emails
});

module.exports = mongoose.model("metachats", metachats);
