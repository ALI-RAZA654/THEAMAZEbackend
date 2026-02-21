const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinary');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name, price, description, mainImage, hoverImage, category, stock, featured
    } = req.body;

    const product = new Product({
        name,
        price,
        user: req.user._id,
        mainImage,
        hoverImage,
        category,
        stock,
        description,
        featured
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, price, description, mainImage, hoverImage, category, stock, featured, isFlashSale, salePrice, variants, gallery
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.mainImage = mainImage || product.mainImage;
        product.hoverImage = hoverImage || product.hoverImage;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.featured = featured !== undefined ? featured : product.featured;
        product.isFlashSale = isFlashSale !== undefined ? isFlashSale : product.isFlashSale;
        product.salePrice = salePrice || product.salePrice;
        product.variants = variants || product.variants;
        product.gallery = gallery || product.gallery;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        // Only delete from Cloudinary if real credentials are configured
        const cloudinaryConfigured =
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_KEY !== 'your_api_key';

        if (product.mainImage && cloudinaryConfigured) {
            try {
                const publicId = product.mainImage.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`the-amaze/products/${publicId}`);
            } catch (cloudErr) {
                console.warn('Cloudinary cleanup failed (non-critical):', cloudErr.message);
            }
        }

        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed successfully' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Update stock
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
const updateStock = asyncHandler(async (req, res) => {
    const { stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.stock = stock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Toggle Featured Status
// @route   PATCH /api/products/:id/featured
// @access  Private/Admin
const toggleFeatured = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.featured = !product.featured;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Toggle Flash Sale Status
// @route   PATCH /api/products/:id/flash-sale
// @access  Private/Admin
const toggleProductFlashSale = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.isFlashSale = !product.isFlashSale;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get products by Category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ featured: true });
    res.json(products);
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFeatured,
    toggleProductFlashSale,
    getProductsByCategory,
    getFeaturedProducts
};
