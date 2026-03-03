const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    description: { type: String },
    copyright: { type: String },
    socials: {
        facebook: { type: String, default: '#' },
        instagram: { type: String, default: '#' },
        tiktok: { type: String, default: '#' }
    },
    sections: {
        showNavigation: { type: Boolean, default: true },
        showDigital: { type: Boolean, default: true },
        showLegal: { type: Boolean, default: true }
    },
    contact: {
        phone: { type: String, default: '+1 (888) AMAZE-26' },
        email: { type: String, default: 'officialtheamaze@gmail.com' },
        location: { type: String, default: 'Tokyo / Paris / New York' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Footer', footerSchema);
