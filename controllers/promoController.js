const asyncHandler = require('express-async-handler');
const Promo = require('../models/Promo');
const Marquee = require('../models/Marquee');

// @desc    Get all promo codes (Admin only)
// @route   GET /api/promo
// @access  Private/Admin
const getPromos = asyncHandler(async (req, res) => {
    const codes = await Promo.find({});
    // Get Marquee (create default if not exists)
    let marquee = await Marquee.findOne({});
    if (!marquee) {
        marquee = await Marquee.create({ text: 'Welcome to THE AMAZE!', active: true });
    }

    res.json({
        codes,
        marquee
    });
});

// @desc    Update Promo Marquee
// @route   PUT /api/promo
// @access  Private/Admin
const updateMarquee = asyncHandler(async (req, res) => {
    const { text, link, active } = req.body;
    let marquee = await Marquee.findOne({});

    if (marquee) {
        marquee.text = text || marquee.text;
        marquee.link = link !== undefined ? link : marquee.link;
        marquee.active = active !== undefined ? active : marquee.active;
        await marquee.save();
        res.json(marquee);
    } else {
        marquee = await Marquee.create({ text, link, active });
        res.status(201).json(marquee);
    }
});

// @desc    Toggle Promo Marquee
// @route   PATCH /api/promo/toggle
// @access  Private/Admin
const toggleMarquee = asyncHandler(async (req, res) => {
    let marquee = await Marquee.findOne({});
    if (marquee) {
        marquee.active = !marquee.active;
        await marquee.save();
        res.json(marquee);
    } else {
        res.status(404);
        throw new Error('Marquee not found');
    }
});

// @desc    Validate a promo code
// @route   POST /api/promo/validate
// @access  Public
const validatePromo = asyncHandler(async (req, res) => {
    const { code } = req.body;
    const promo = await Promo.findOne({ code, active: true, expiryDate: { $gte: new Date() } });

    if (promo) {
        res.json(promo);
    } else {
        res.status(404);
        throw new Error('Invalid or expired promo code');
    }
});

// @desc    Create a new promo code (Admin only)
// @route   POST /api/promo
// @access  Private/Admin
const createPromo = asyncHandler(async (req, res) => {
    const promo = new Promo(req.body);
    const created = await promo.save();
    res.status(201).json(created);
});

// @desc    Delete a promo code (Admin only)
// @route   DELETE /api/promo/:id
// @access  Private/Admin
const deletePromo = asyncHandler(async (req, res) => {
    const promo = await Promo.findById(req.params.id);

    if (promo) {
        await Promo.deleteOne({ _id: promo._id });
        res.json({ message: 'Promo code removed' });
    } else {
        res.status(404);
        throw new Error('Promo code not found');
    }
});

module.exports = { getPromos, validatePromo, createPromo, deletePromo, updateMarquee, toggleMarquee };
