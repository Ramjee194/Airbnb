import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getMessages = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.userId;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ createdAt: 1 }); // chronological order

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to load messages", error: err.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all messages involving this user
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    }).sort({ createdAt: -1 });

    const contactIds = new Set();
    messages.forEach(msg => {
      if (msg.sender.toString() !== userId) {
        contactIds.add(msg.sender.toString());
      }
      if (msg.receiver.toString() !== userId) {
        contactIds.add(msg.receiver.toString());
      }
    });

    const contacts = await User.find({ _id: { $in: Array.from(contactIds) } }).select("name email");
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to load conversations", error: err.message });
  }
};
