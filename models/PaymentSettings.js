const mongoose = require('mongoose');

const paymentSettingsSchema = new mongoose.Schema({
    method: { type: String, required: true, unique: true }, // 'COD', 'EasyPaisa', 'JazzCash'
    details: { type: String }, // For EasyPaisa/JazzCash account numbers
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

const PaymentSettings = mongoose.model('PaymentSettings', paymentSettingsSchema);
module.exports = PaymentSettings;
