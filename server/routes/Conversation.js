const router = require("express").Router();
const Conversation = require("../models/Conversation");

// New conversation
router.post("/", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if a conversation already exists for these two users
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      // Conversation already exists, return it
      res.status(200).json(existingConversation);
    } else {
      // Conversation does not exist, create a new one
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });

      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Get all conversations
router.get("/", async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get conversations of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get conversation including two userIds
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
