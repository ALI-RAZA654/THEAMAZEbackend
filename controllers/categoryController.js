const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/category
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    // If empty, seed defaults
    if (categories.length === 0) {
        const defaults = [
            { uid: 'vanguard', name: 'Vanguard Series', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000', isActive: true },
            { uid: 'essentials', name: 'Essentials', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000', isActive: true },
            { uid: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000', isActive: true }
        ];
        const seeded = await Category.insertMany(defaults);
        return res.json(seeded);
    }
    res.json(categories);
});

// @desc    Update categories (bulk)
// @route   PUT /api/category
// @access  Private/Admin
const updateCategories = asyncHandler(async (req, res) => {
    const updatedCategoriesData = req.body; // Array of { uid, name, image, isActive }

    for (const data of updatedCategoriesData) {
        await Category.findOneAndUpdate(
            { uid: data.uid },
            {
                name: data.name,
                image: data.image,
                isActive: data.isActive !== undefined ? data.isActive : true
            },
            { upsert: true, new: true }
        );
    }

    const categories = await Category.find({});
    res.json(categories);
});

module.exports = { getCategories, updateCategories };
