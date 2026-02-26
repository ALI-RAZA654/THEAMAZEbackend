const express = require('express');
const router = express.Router();
const { getLookbook, updateLookbook } = require('../controllers/lookbookController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getLookbook)
    .put(protect, admin, updateLookbook);

module.exports = router;
