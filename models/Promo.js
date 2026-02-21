const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, required: true, enum: ['Percentage', 'Fixed'] },
    discountValue: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Promo = mongoose.model('Promo', promoSchema);
module.exports = Promo;
