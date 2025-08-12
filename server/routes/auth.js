const express = require('express');
const router = express.Router();

// Import auth controller functions for handling registration and login
const { register, login } = require('../controllers/authController');

// Route for new user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Export the router to be used in the main app
module.exports = router;
