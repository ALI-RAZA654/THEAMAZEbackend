const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    colorName: { type: String, required: true },
    image: { type: String, required: true } // Cloudinary URL
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    salePrice: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    badge: { type: String },
    isFlashSale: { type: Boolean, default: false },
    mainImage: { type: String, required: true }, // Cloudinary URL
    hoverImage: { type: String },
    sizeChart: { type: String }, // NEW: Size Chart Image URL
    sizes: [String], // NEW: Available sizes (e.g., ["M", "L", "XL"])
    variants: [variantSchema],
    gallery: [String], // Array of Cloudinary URLs
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
