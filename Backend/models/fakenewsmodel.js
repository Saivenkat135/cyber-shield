const mongoose = require("mongoose");

//new user  model
const fakenews = new mongoose.Schema({
  headline: String,
  tcontent: String,
  happened_int_count: Number,
});

module.exports = mongoose.model("fakenews", fakenews);
