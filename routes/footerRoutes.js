const express = require('express');
const router = express.Router();
const { getFooter, updateFooter } = require('../controllers/footerController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getFooter)
    .put(protect, admin, updateFooter);

module.exports = router;
