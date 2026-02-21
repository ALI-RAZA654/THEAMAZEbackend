const mongoose = require('mongoose');

const trustStatSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String }, // FontAwesome class or image URL
}, {
    timestamps: true
});

const TrustStat = mongoose.model('TrustStat', trustStatSchema);
module.exports = TrustStat;
