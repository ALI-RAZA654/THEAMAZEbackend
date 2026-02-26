const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    // 🆕 FALLBACK: If user not in DB, check against .env credentials
    if (!user && email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        console.log('🏁 Admin user not found. Creating from .env credentials...');
        user = await User.create({
            name: 'System Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            isAdmin: true
        });
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Auto-set admin if email matches ADMIN_EMAIL in .env
    const isAdminUser = isAdmin === true || email === process.env.ADMIN_EMAIL;

    const user = await User.create({
        name,
        email,
        password,
        isAdmin: isAdminUser,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Verify token (used by frontend)
// @route   GET /api/auth/verify
// @access  Private
const verifyToken = asyncHandler(async (req, res) => {
    // If middleware passed, token is valid
    res.json({ valid: true, user: req.user });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    // Client side clears token, server confirms
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    verifyToken,
    logoutUser
};
