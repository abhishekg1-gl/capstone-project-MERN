const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/authMiddleware');
const { getMessages, postMessage } = require('../controllers/messageController');

// Mounted at /api/channels/:id/messages
router.get('/:id/messages', auth, getMessages);
router.post('/:id/messages', auth, postMessage);

module.exports = router;
