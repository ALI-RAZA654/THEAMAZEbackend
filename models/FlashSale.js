const mongoose = require('mongoose');

const flashSaleSchema = new mongoose.Schema({
    active: { type: Boolean, default: false },
    discountPercentage: { type: Number, required: true, default: 0 },
    endTime: { type: Date, required: true },
    bannerText: { type: String, required: true },
}, {
    timestamps: true
});

const FlashSale = mongoose.model('FlashSale', flashSaleSchema);
module.exports = FlashSale;
