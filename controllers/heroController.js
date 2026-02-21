const asyncHandler = require('express-async-handler');
const Hero = require('../models/Hero');

const getHeroes = asyncHandler(async (req, res) => {
    const heroes = await Hero.find({ active: true });
    res.json(heroes);
});

const createHero = asyncHandler(async (req, res) => {
    const hero = new Hero(req.body);
    const created = await hero.save();
    res.status(201).json(created);
});

// @desc    Toggle hero spotlight
// @route   PATCH /api/hero/toggle-spotlight
// @access  Private/Admin
const toggleSpotlight = asyncHandler(async (req, res) => {
    // This assumes there's only one active hero or we toggle the first found
    // If multiple heroes exist and we want to toggle a specific one, we need :id
    // But API list says /api/hero/toggle-spotlight without ID
    // So let's assume it finds the single main hero or first one
    const hero = await Hero.findOne({});
    if (hero) {
        hero.active = !hero.active;
        await hero.save();
        res.json(hero);
    } else {
        res.status(404);
        throw new Error('Hero section not set up');
    }
});

module.exports = { getHeroes, createHero, toggleSpotlight };
