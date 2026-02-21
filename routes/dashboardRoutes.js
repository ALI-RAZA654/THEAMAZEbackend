const express = require('express');
const router = express.Router();
const { getDashboardOverview, getLowStockProducts } = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/overview', protect, admin, getDashboardOverview);
router.get('/low-stock', protect, admin, getLowStockProducts);

// Alias root to overview for convenience
router.get('/', protect, admin, getDashboardOverview);

module.exports = router;
