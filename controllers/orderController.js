const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        customerInfo,
        totalAmount,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const orderId = `AMZ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const order = new Order({
            orderItems,
            user: req.user ? req.user._id : null,
            orderId,
            customerInfo,
            shippingAddress,
            paymentMethod,
            totalAmount,
        });

        const createdOrder = await order.save();

        // Stock reduction
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock -= item.qty;
                await product.save();
            }
        }

        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        if (order.status === 'Delivered') {
            order.isPaid = true;
            order.paidAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Get order statistics
// @route   GET /api/admin/orders/stats
// @access  Private/Admin
const getOrderStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();

    // Group by status
    const stats = await Order.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    // Format stats
    const formattedStats = stats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});

    res.json({
        totalOrders,
        statusBreakdown: formattedStats
    });
});

// @desc    Get order revenue
// @route   GET /api/admin/orders/revenue
// @access  Private/Admin
const getOrderRevenue = asyncHandler(async (req, res) => {
    const orders = await Order.find({ isPaid: true });

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Initial calculation - for more detailed revenue (monthly/daily), aggregation is better
    const revenueByMonth = await Order.aggregate([
        { $match: { isPaid: true } },
        {
            $group: {
                _id: { $month: "$createdAt" },
                total: { $sum: "$totalPrice" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    res.json({
        totalRevenue,
        revenueByMonth
    });
});

// @desc    Filter orders
// @route   GET /api/admin/orders/filter
// @access  Private/Admin
const filterOrders = asyncHandler(async (req, res) => {
    const { status, dateFrom, dateTo } = req.query;
    let query = {};

    if (status) {
        query.status = status;
    }

    if (dateFrom || dateTo) {
        query.createdAt = {};
        if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
        if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
});

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getOrders,
    getMyOrders,
    getOrderStats,
    getOrderRevenue,
    filterOrders
};
