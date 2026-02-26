const asyncHandler = require('express-async-handler');
const Hero = require('../models/Hero');

// @desc    Get current hero configuration
// @route   GET /api/hero
// @access  Public
const getHero = asyncHandler(async (req, res) => {
    let hero = await Hero.findOne({});
    if (!hero) {
        hero = await Hero.create({
            heading: "DIGITAL SCULPTURES.",
            subtext: "Redefining the relationship between advanced textiles and human form.",
            videoLink: "",
            ctaText: "Purchase the future",
            enableSpotlight: true
        });
    }
    res.json(hero);
});

// @desc    Update hero configuration (Admin only)
// @route   PUT /api/hero
// @access  Private/Admin
const updateHero = asyncHandler(async (req, res) => {
    const { heading, subtext, videoLink, ctaText, featuredProductId, spotlightProductIds, enableSpotlight } = req.body;
    let hero = await Hero.findOne({});

    if (!hero) {
        hero = new Hero({});
    }

    hero.heading = heading || hero.heading;
    hero.subtext = subtext || hero.subtext;
    hero.videoLink = videoLink !== undefined ? videoLink : hero.videoLink;
    hero.ctaText = ctaText || hero.ctaText;
    hero.featuredProductId = featuredProductId !== undefined ? featuredProductId : hero.featuredProductId;
    hero.spotlightProductIds = spotlightProductIds !== undefined ? spotlightProductIds : hero.spotlightProductIds;
    hero.enableSpotlight = enableSpotlight !== undefined ? enableSpotlight : hero.enableSpotlight;

    const updatedHero = await hero.save();
    res.json(updatedHero);
});

// @desc    Toggle hero active status
// @route   PATCH /api/hero/toggle
// @access  Private/Admin
const toggleHero = asyncHandler(async (req, res) => {
    const hero = await Hero.findOne({});
    if (hero) {
        hero.active = !hero.active;
        await hero.save();
        res.json(hero);
    } else {
        res.status(404);
        throw new Error('Hero not found');
    }
});

module.exports = { getHero, updateHero, toggleHero };
