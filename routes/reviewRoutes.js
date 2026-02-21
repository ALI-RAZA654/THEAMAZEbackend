const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview, toggleReviews } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getReviews)
    .post(addReview);

router.patch('/toggle', protect, admin, toggleReviews);

router.route('/:id')
    .put(protect, admin, updateReview)
    .delete(protect, admin, deleteReview);

module.exports = router;
