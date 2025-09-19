import Channel from '../models/Channel.js';
import User from '../models/User.js';
// Create a new channel and add creator as a member
export const createChannel = async (req, res) => {
  const { name, description } = req.body;
  try {
    const channel = await Channel.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    // Add channel to user's joinedChannels
    await User.findByIdAndUpdate(req.user.id, { $push: { joinedChannels: channel._id } });
    res.status(201).json(channel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get list of public channels (excluding members for brevity)
export const getPublicChannels = async (req, res) => {
  const channels = await Channel.find().select('-members').sort('-createdAt');
  res.json(channels);
};

// Add current user to channel members and vice versa
export const joinChannel = async (req, res) => {
  const { id } = req.params;
  try {
    await Channel.findByIdAndUpdate(id, { $addToSet: { members: req.user.id } });
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { joinedChannels: id } });
    res.json({ message: 'Joined channel' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get channel details including member usernames
export const getChannelById = async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate('members', 'username');
  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  res.json(channel);
};
