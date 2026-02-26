const asyncHandler = require('express-async-handler');
const TrustStat = require('../models/TrustStat');

const getTrustStats = asyncHandler(async (req, res) => {
    const stats = await TrustStat.find({});
    res.json(stats);
});

const updateTrustStat = asyncHandler(async (req, res) => {
    const { id, value, label, icon } = req.body;
    const stat = await TrustStat.findById(id);
    if (stat) {
        stat.value = value !== undefined ? value : stat.value;
        stat.label = label !== undefined ? label : stat.label;
        stat.icon = icon !== undefined ? icon : stat.icon;
        await stat.save();
        res.json(stat);
    } else {
        res.status(404);
        throw new Error('Stat not found');
    }
});

const createTrustStat = asyncHandler(async (req, res) => {
    const { icon, value, label } = req.body;
    const stat = await TrustStat.create({ icon, value, label });
    res.status(201).json(stat);
});

const updateTrustIcon = asyncHandler(async (req, res) => {
    const { id, icon } = req.body;
    const stat = await TrustStat.findById(id);
    if (stat) {
        stat.icon = icon;
        await stat.save();
        res.json(stat);
    } else {
        res.status(404);
        throw new Error('Stat not found');
    }
});

module.exports = { getTrustStats, updateTrustStat, createTrustStat, updateTrustIcon };
