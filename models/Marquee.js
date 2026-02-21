const mongoose = require('mongoose');

const marqueeSchema = new mongoose.Schema({
    text: { type: String, required: true },
    link: { type: String, default: '' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Marquee', marqueeSchema);
