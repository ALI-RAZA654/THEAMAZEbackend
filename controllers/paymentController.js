const asyncHandler = require('express-async-handler');
const PaymentSettings = require('../models/PaymentSettings');

// @desc    Get payment settings
// @route   GET /api/payment
// @access  Public
const getPaymentSettings = asyncHandler(async (req, res) => {
    let settings = await PaymentSettings.findOne({});
    if (!settings) {
        settings = await PaymentSettings.create({
            easyPaisa: '03451234567',
            jazzCash: '03007654321',
            shippingFee: 250,
            enableCOD: true
        });
    }
    res.json(settings);
});

// @desc    Update payment settings (Admin only)
// @route   PUT /api/payment
// @access  Private/Admin
const updatePaymentSettings = asyncHandler(async (req, res) => {
    const { easyPaisa, jazzCash, shippingFee, enableCOD } = req.body;
    let settings = await PaymentSettings.findOne({});

    if (!settings) {
        settings = new PaymentSettings({});
    }

    settings.easyPaisa = easyPaisa !== undefined ? easyPaisa : settings.easyPaisa;
    settings.jazzCash = jazzCash !== undefined ? jazzCash : settings.jazzCash;
    settings.shippingFee = shippingFee !== undefined ? shippingFee : settings.shippingFee;
    settings.enableCOD = enableCOD !== undefined ? enableCOD : settings.enableCOD;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
});

module.exports = { getPaymentSettings, updatePaymentSettings };
