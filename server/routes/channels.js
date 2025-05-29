const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createChannel,
  getPublicChannels,
  joinChannel,
  getChannelById
} = require('../controllers/channelController');

router.post('/', auth, createChannel);
router.get('/public', auth, getPublicChannels);
router.post('/:id/join', auth, joinChannel);
router.get('/:id', auth, getChannelById);

module.exports = router;
