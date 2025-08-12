const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../middleware/authMiddleware');
const { getMessages, postMessage } = require('../controllers/messageController');

// Message routes for a specific channel (protected by auth)
router.get('/:id/messages', auth, getMessages);
router.post('/:id/messages', auth, postMessage);

module.exports = router;
