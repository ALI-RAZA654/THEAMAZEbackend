const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    ctaText: { type: String, default: 'Shop Now' },
    ctaLink: { type: String, default: '/archive' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero;
