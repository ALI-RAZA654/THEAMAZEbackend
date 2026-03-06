const mongoose = require('mongoose');

const marqueeSchema = new mongoose.Schema({
    texts: [{ type: String, required: true }],
    link: { type: String, default: '' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Marquee', marqueeSchema);
