const express = require('express');
const authController = require('../controllers/auth')
const router = express.Router();

// Login route
router.post('/login', authController.login);

module.exports = router;
