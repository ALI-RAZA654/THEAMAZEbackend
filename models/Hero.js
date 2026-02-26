const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subtext: { type: String, required: true },
    videoLink: { type: String },
    ctaText: { type: String, default: 'Shop Now' },
    featuredProductId: { type: String },
    spotlightProductIds: [{ type: String }],
    enableSpotlight: { type: Boolean, default: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hero', heroSchema);
