const asyncHandler = require('express-async-handler');
const PaymentSettings = require('../models/PaymentSettings');

// @desc    Get all active payment methods
// @route   GET /api/payment
// @access  Public
const getPaymentMethods = asyncHandler(async (req, res) => {
    const methods = await PaymentSettings.find({ active: true });
    res.json(methods);
});

// @desc    Update payment method details (Admin only)
// @route   PUT /api/payment
// @access  Private/Admin
const updatePaymentMethod = asyncHandler(async (req, res) => {
    const { method, details, active } = req.body;
    let payment = await PaymentSettings.findOne({ method });

    if (payment) {
        payment.details = details || payment.details;
        payment.active = active !== undefined ? active : payment.active;
    } else {
        payment = new PaymentSettings({ method, details, active });
    }

    const updatedPayment = await payment.save();
    res.json(updatedPayment);
});

// @desc    Create payment method (Admin only)
// @route   POST /api/payment
// @access  Private/Admin
const createPaymentMethod = asyncHandler(async (req, res) => {
    const { method, details, active } = req.body;

    const exists = await PaymentSettings.findOne({ method });
    if (exists) {
        res.status(400);
        throw new Error('Payment method already exists. Use PUT to update.');
    }

    const payment = await PaymentSettings.create({
        method,
        details: details || '',
        active: active !== undefined ? active : true
    });

    res.status(201).json(payment);
});

// @desc    Toggle COD specifically
// @route   PATCH /api/payment/cod-toggle
// @access  Private/Admin
const toggleCOD = asyncHandler(async (req, res) => {
    const payment = await PaymentSettings.findOne({ method: 'Cash on Delivery' });
    if (payment) {
        payment.active = !payment.active;
        await payment.save();
        res.json(payment);
    } else {
        // If not found, create it disabled? or error?
        // Let's create it
        const newPayment = await PaymentSettings.create({
            method: 'Cash on Delivery',
            details: 'Pay upon delivery',
            active: true // default enabled
        });
        res.json(newPayment);
    }
});

module.exports = { getPaymentMethods, updatePaymentMethod, createPaymentMethod, toggleCOD };
