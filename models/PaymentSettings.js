const mongoose = require('mongoose');

const paymentSettingsSchema = new mongoose.Schema({
    easyPaisa: { type: String, default: '' },
    easyPaisaTitle: { type: String, default: '' },
    easyPaisaActive: { type: Boolean, default: true },
    jazzCash: { type: String, default: '' },
    jazzCashTitle: { type: String, default: '' },
    jazzCashActive: { type: Boolean, default: true },
    shippingFee: { type: Number, default: 0 },
    enableCOD: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('PaymentSettings', paymentSettingsSchema);
