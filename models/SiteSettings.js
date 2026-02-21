const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    reviewsEnabled: { type: Boolean, default: true },
    // Can add other global toggles here later
}, {
    timestamps: true
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
