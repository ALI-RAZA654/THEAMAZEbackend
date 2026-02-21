const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

// PATCH routes for specific updates
router.patch('/:id/stock', protect, admin, updateStock);
router.patch('/:id/featured', protect, admin, toggleFeatured);
router.patch('/:id/flash-sale', protect, admin, toggleProductFlashSale);

module.exports = router;
