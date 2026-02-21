const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const SiteSettings = require('../models/SiteSettings');

const getReviews = asyncHandler(async (req, res) => {
    // If admin (check handled via route/middleware logic ideally, but here we can check req.user if protected)
    // For now we assume public endpoint returns approved, admin endpoint returns all.
    // Let's check query param or handle in route
    const { approved } = req.query;
    let query = {};
    if (approved === 'true') {
        query.approved = true;
    }

    // For public, we might want settings too?
    const reviews = await Review.find(query).sort({ createdAt: -1 });

    // Get Site Settings
    let settings = await SiteSettings.findOne({});
    if (!settings) {
        settings = await SiteSettings.create({ reviewsEnabled: true });
    }

    res.json({
        reviews,
        settings
    });
});

const addReview = asyncHandler(async (req, res) => {
    const review = new Review(req.body);
    const created = await review.save();
    res.status(201).json(created);
});

// @desc    Update review (approve/reject)
// @route   PUT /api/reviews/:id
// @access  Private/Admin
const updateReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
        review.approved = req.body.approved !== undefined ? req.body.approved : review.approved;
        // Allows editing content too?
        review.comment = req.body.comment || review.comment;
        review.rating = req.body.rating || review.rating;

        await review.save();
        res.json(review);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
        await review.deleteOne();
        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc    Toggle Global Reviews
// @route   PATCH /api/reviews/toggle
// @access  Private/Admin
const toggleReviews = asyncHandler(async (req, res) => {
    let settings = await SiteSettings.findOne({});
    if (settings) {
        settings.reviewsEnabled = !settings.reviewsEnabled;
        await settings.save();
        res.json(settings);
    } else {
        settings = await SiteSettings.create({ reviewsEnabled: true });
        res.json(settings);
    }
});

module.exports = { getReviews, addReview, updateReview, deleteReview, toggleReviews };
