const mongoose = require("mongoose");

//new user  model
const user = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  violated_count: { type: Number, default: 0 },
  banned_time: { type: String, default: "" },
  chats: [Number],
  profile_image_id: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" },
});

module.exports = mongoose.model("user", user);
