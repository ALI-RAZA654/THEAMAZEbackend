const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile, logoutUser, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.post('/logout', logoutUser); // 🆕 Added
router.get('/verify', protect, verifyToken); // 🆕 Added

module.exports = router;
