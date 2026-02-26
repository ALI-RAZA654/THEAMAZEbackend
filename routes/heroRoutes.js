const express = require('express');
const router = express.Router();
const { getHero, updateHero, toggleHero } = require('../controllers/heroController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getHero)
    .put(protect, admin, updateHero);

router.patch('/toggle', protect, admin, toggleHero);

module.exports = router;
