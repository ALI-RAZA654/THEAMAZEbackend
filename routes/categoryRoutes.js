const express = require('express');
const router = express.Router();
const { getCategories, updateCategories } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCategories)
    .put(protect, admin, updateCategories);

module.exports = router;
