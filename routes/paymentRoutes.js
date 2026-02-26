const express = require('express');
const router = express.Router();
const { getPaymentSettings, updatePaymentSettings } = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getPaymentSettings)
    .put(protect, admin, updatePaymentSettings);

module.exports = router;
