const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Order = require('../models/Order');
const FlashSale = require('../models/FlashSale');
const calculateRevenue = require('../utils/calculateRevenue');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private/Admin
// @desc    Get dashboard overview
// @route   GET /api/dashboard/overview
// @access  Private/Admin
const getDashboardOverview = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});

    const orders = await Order.find({});
    // Calculate total revenue
    const totalRevenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

    const activeFlashSale = await FlashSale.findOne({ active: true });

    // Recent 5 orders
    const recentOrders = await Order.find({})
        .populate('user', 'name')
        .sort({ createdAt: -1 })
        .limit(5);

    // Monthly revenue chart data (simplified last 6 months)
    const monthlyRevenue = await Order.aggregate([
        {
            $match: { isPaid: true }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                total: { $sum: "$totalPrice" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    res.json({
        totalOrders,
        totalProducts,
        totalRevenue,
        activeFlashSale: !!activeFlashSale,
        recentOrders,
        monthlyRevenue
    });
});

// @desc    Get low stock products
// @route   GET /api/dashboard/low-stock
// @access  Private/Admin
const getLowStockProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ stock: { $lt: 10 } }).select('name stock price mainImage');
    res.json(products);
});

module.exports = { getDashboardOverview, getLowStockProducts };
