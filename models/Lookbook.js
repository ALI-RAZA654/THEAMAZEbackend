const mongoose = require('mongoose');

const lookbookSchema = new mongoose.Schema({
    videoLink: { type: String, required: true },
    isEnabled: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Lookbook', lookbookSchema);
