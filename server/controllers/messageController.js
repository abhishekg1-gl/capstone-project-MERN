const Message = require('../models/Message');

// Get all messages for a specific channel, with sender info
exports.getMessages = async (req, res) => {
  const { id: channelId } = req.params;
  const messages = await Message.find({ channelId })
    .populate('sender', 'username')
    .sort('timestamp');
  res.json(messages);
};

// Post a new message to a channel
exports.postMessage = async (req, res) => {
  const { id: channelId } = req.params;
  const { content } = req.body;
  try {
    const message = await Message.create({
      content,
      sender: req.user.id,
      channelId
    });
    // Populate sender username before sending response
    await message.populate('sender', 'username');
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
