const Channel = require('../models/Channel');
const User = require('../models/User');

exports.createChannel = async (req, res) => {
  const { name, description } = req.body;
  try {
    const channel = await Channel.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    });
    // add to user's joinedChannels
    await User.findByIdAndUpdate(req.user.id, { $push: { joinedChannels: channel._id } });
    res.status(201).json(channel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPublicChannels = async (req, res) => {
  const channels = await Channel.find().select('-members').sort('-createdAt');
  res.json(channels);
};

exports.joinChannel = async (req, res) => {
  const { id } = req.params;
  try {
    await Channel.findByIdAndUpdate(id, { $addToSet: { members: req.user.id } });
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { joinedChannels: id } });
    res.json({ message: 'Joined channel' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getChannelById = async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate('members', 'username');
  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  res.json(channel);
};
