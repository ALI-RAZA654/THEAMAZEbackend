const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // e.g., 'men', 'women'
    name: { type: String, required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
