const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    singletonId: { type: String, default: 'about', unique: true }, // Ensure only one document exists
    storyTitle: { type: String, default: 'Beyond the Interface.' },
    storyText1: { type: String, default: 'We don\'t just sell clothes; we architect identities. Every thread in our 2026 collection is infused with the spirit of the avant-garde. We believe in high-impact visuals that translate directly into emotional connection.' },
    storyText2: { type: String, default: 'THE AMAZE was born at the intersection of technical precision and artistic rebellion. Our mission is to provide the elite with garments that act as a digital extension of their physical presence.' },
    storyImage: { type: String, default: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200' },

    philosophyText: { type: String, default: 'Identity is not static. It is a series of digital and physical sculptures. Our design language mirrors this fluidity.' },
    engineeringText: { type: String, default: 'Textiles are treated as hardware. Every seam is a protocol. Every fabric is a data point of comfort and style.' },
    legacyText: { type: String, default: 'Built for the 2026 landscape. We are not just a brand; we are a historical archive of the future.' },

    materialsTitle: { type: String, default: 'Fabric is the signal.' },
    materialsText: { type: String, default: 'Every drop uses controlled fabric selection, strict consistency checks, and a silhouette that feels premium on first wear.' },
    materialsImage: { type: String, default: 'https://images.unsplash.com/photo-1520975958225-0f4a25f2f5ee?auto=format&fit=crop&w=1600&q=80' }
}, {
    timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);
