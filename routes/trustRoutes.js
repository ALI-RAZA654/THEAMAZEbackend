const express = require('express');
const router = express.Router();
const { getTrustStats, updateTrustStat, createTrustStat, updateTrustIcon } = require('../controllers/trustController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTrustStats)
    .post(protect, admin, createTrustStat)
    .put(protect, admin, updateTrustStat);

router.patch('/icon', protect, admin, updateTrustIcon);

module.exports = router;
