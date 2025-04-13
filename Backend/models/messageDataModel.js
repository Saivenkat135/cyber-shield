const mongoose = require("mongoose");

//new user  model
const messagedata = new mongoose.Schema({
  chat_id: Number,
  chat_name: String,
  sentemail: String,
  sentname: String,
  time: String,
  mdata: String,
});

module.exports = mongoose.model("messagedata", messagedata);
