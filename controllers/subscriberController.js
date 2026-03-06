const asyncHandler = require('express-async-handler');
const Subscriber = require('../models/Subscriber');
const sendEmail = require('../config/mailer');

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Private/Admin
const getSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    res.json(subscribers);
});

// @desc    Add new subscriber
// @route   POST /api/subscribers
// @access  Public
const addSubscriber = asyncHandler(async (req, res) => {
    const { email, source } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Email is required Protocol');
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
        res.status(400);
        throw new Error('Email Already Registered in Elite Protocol');
    }

    const subscriber = await Subscriber.create({
        email,
        source: source || 'Inner Circle'
    });

    // Notify Admin (Optional)
    try {
        await sendEmail({
            email: process.env.ADMIN_EMAIL || 'admin@theamaze.fashion',
            subject: `New Elite Protocol Access: ${email}`,
            message: `A new user has joined the Elite Protocol.\n\nEmail: ${email}\nSource: ${source || 'Website Form'}\n\nWelcome to the Inner Circle.`
        });
    } catch (err) {
        console.error('Email Notification Failure:', err);
    }

    res.status(201).json(subscriber);
});

// @desc    Delete subscriber
// @route   DELETE /api/subscribers/:id
// @access  Private/Admin
const deleteSubscriber = asyncHandler(async (req, res) => {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber) {
        await subscriber.deleteOne();
        res.json({ message: 'Subscriber Erased from Protocol' });
    } else {
        res.status(404);
        throw new Error('Subscriber not found');
    }
});

module.exports = {
    getSubscribers,
    addSubscriber,
    deleteSubscriber
};
