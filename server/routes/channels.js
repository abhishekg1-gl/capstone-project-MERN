import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  createChannel,
  getPublicChannels,
  joinChannel,
  getChannelById,
  unsubscribeChannel
} from '../controllers/channelController.js';

const router = express.Router();

// Channel routes (all protected by auth middleware)
router.post('/', auth, createChannel);
router.get('/public', auth, getPublicChannels);
router.post('/:id/join', auth, joinChannel);
router.get('/:id', auth, getChannelById);
router.post('/:id/leave', auth, unsubscribeChannel); 

export default router;