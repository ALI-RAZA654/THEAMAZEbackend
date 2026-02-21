const express = require('express');
const router = express.Router();
const { getPaymentMethods, updatePaymentMethod, createPaymentMethod, toggleCOD } = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getPaymentMethods)
    .post(protect, admin, createPaymentMethod)
    .put(protect, admin, updatePaymentMethod);

// Alias /settings to same controller functions
router.get('/settings', getPaymentMethods);
router.put('/settings', protect, admin, updatePaymentMethod);

router.patch('/cod-toggle', protect, admin, toggleCOD);

module.exports = router;
