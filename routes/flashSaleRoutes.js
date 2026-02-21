const express = require('express');
const router = express.Router();
const { getFlashSale, updateFlashSale, createFlashSale, toggleFlashSaleStatus } = require('../controllers/flashSaleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getFlashSale)
    .post(protect, admin, createFlashSale)
    .put(protect, admin, updateFlashSale);

router.patch('/toggle', protect, admin, toggleFlashSaleStatus);

module.exports = router;
