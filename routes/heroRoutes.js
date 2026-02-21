const express = require('express');
const router = express.Router();
const { getHeroes, createHero, toggleSpotlight } = require('../controllers/heroController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getHeroes)
    .post(protect, admin, createHero);

router.patch('/toggle-spotlight', protect, admin, toggleSpotlight);

module.exports = router;
