const mongoose = require('mongoose');

const paymentSettingsSchema = new mongoose.Schema({
    easyPaisa: { type: String, default: '' },
    jazzCash: { type: String, default: '' },
    shippingFee: { type: Number, default: 0 },
    enableCOD: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('PaymentSettings', paymentSettingsSchema);
