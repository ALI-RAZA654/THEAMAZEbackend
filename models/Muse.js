const mongoose = require('mongoose');

const museSchema = new mongoose.Schema({
    author: { type: String, required: true },
    location: { type: String, default: 'Global' },
    image: { type: String, required: true },
    text: { type: String, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Muse', museSchema);
