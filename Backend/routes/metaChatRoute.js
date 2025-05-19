const express = require("express");
const {
  createChat,
  getMetaChats
} = require("../controllers/metaChatsController");
const router = express.Router();

//route for creating new chat
router.route("/create-new-chat").post(createChat);

//route to get meta info about chat
router.route("/get-chat-meta").post(getMetaChats);

module.exports = router;
