const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    reviewsEnabled: { type: Boolean, default: true },
    socialPulseEnabled: { type: Boolean, default: true },
    socialPulseText: { type: String, default: 'New order from {city} - {product}' },
    socialPulseFrequency: { type: Number, default: 5000 },
}, {
    timestamps: true
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
