const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    description: { type: String },
    copyright: { type: String },
    socials: {
        instagram: { type: String, default: '#' },
        x: { type: String, default: '#' },
        linkedin: { type: String, default: '#' }
    },
    sections: {
        showNavigation: { type: Boolean, default: true },
        showDigital: { type: Boolean, default: true },
        showLegal: { type: Boolean, default: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Footer', footerSchema);
