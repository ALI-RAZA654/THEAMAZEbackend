const asyncHandler = require('express-async-handler');
const FlashSale = require('../models/FlashSale');
const Product = require('../models/Product');

// @desc    Get current flash sale settings
// @route   GET /api/flash-sale
// @access  Public
const getFlashSale = asyncHandler(async (req, res) => {
    const sale = await FlashSale.findOne({});
    res.json(sale);
});

// @desc    Update flash sale settings (Admin only)
// @route   PUT /api/flash-sale
// @access  Private/Admin
const updateFlashSale = asyncHandler(async (req, res) => {
    const { active, discountPercentage, endTime, bannerText } = req.body;

    let sale = await FlashSale.findOne({});

    if (sale) {
        sale.active = active !== undefined ? active : sale.active;
        sale.discountPercentage = discountPercentage || sale.discountPercentage;
        sale.endTime = endTime || sale.endTime;
        sale.bannerText = bannerText || sale.bannerText;
    } else {
        sale = new FlashSale({ active, discountPercentage, endTime, bannerText });
    }

    const updatedSale = await sale.save();

    // If active, update products marked as flash sale (logic can be expanded here)
    if (updatedSale.active) {
        await Product.updateMany(
            { isFlashSale: true },
            [
                {
                    $set: {
                        salePrice: {
                            $multiply: ["$price", (1 - updatedSale.discountPercentage / 100)]
                        }
                    }
                }
            ]
        );
    }

    res.json(updatedSale);
});

// @desc    Create flash sale (Admin only)
// @route   POST /api/flash-sale
// @access  Private/Admin
const createFlashSale = asyncHandler(async (req, res) => {
    const { active, discountPercentage, endTime, bannerText } = req.body;

    // Delete old one and create fresh
    await FlashSale.deleteMany({});

    const sale = await FlashSale.create({
        active: active !== undefined ? active : false,
        discountPercentage: discountPercentage || 0,
        endTime: endTime || new Date(Date.now() + 24 * 60 * 60 * 1000),
        bannerText: bannerText || 'Flash Sale!'
    });

    res.status(201).json(sale);
});

// @desc    Toggle flash sale status
// @route   PATCH /api/flash-sale/toggle
// @access  Private/Admin
const toggleFlashSaleStatus = asyncHandler(async (req, res) => {
    let sale = await FlashSale.findOne({});
    if (sale) {
        sale.active = !sale.active;
        await sale.save();
        res.json(sale);
    } else {
        // Create one with default values if it doesn't exist
        sale = new FlashSale({ active: true });
        await sale.save();
        res.json(sale);
    }
});

module.exports = { getFlashSale, updateFlashSale, createFlashSale, toggleFlashSaleStatus };
