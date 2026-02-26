const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getOrders,
    getMyOrders,
    getOrderStats,
    getOrderRevenue,
    filterOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(addOrderItems)
    .get(protect, admin, getOrders);

// User specific routes
router.route('/myorders').get(protect, getMyOrders);

// Admin Stats & Filters - MUST be before /:id
router.get('/admin/orders', protect, admin, getOrders); // Alias for consistency
router.get('/admin/orders/stats', protect, admin, getOrderStats);
router.get('/admin/orders/revenue', protect, admin, getOrderRevenue);
router.get('/admin/orders/filter', protect, admin, filterOrders);

// Order ID specific routes
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);
router.route('/:id').delete(protect, admin, async (req, res) => {
    // Delete order (quick inline implementation or move to controller)
    const order = await require('../models/Order').findById(req.params.id);
    if (order) {
        await order.deleteOne();
        res.json({ message: 'Order removed' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

module.exports = router;
