const express = require('express');
const router = express.Router();
const {
    getSubscribers,
    addSubscriber,
    deleteSubscriber
} = require('../controllers/subscriberController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(addSubscriber)
    .get(protect, admin, getSubscribers);

router.delete('/:id', protect, admin, deleteSubscriber);

module.exports = router;
