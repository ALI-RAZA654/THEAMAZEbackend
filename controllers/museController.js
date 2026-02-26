const asyncHandler = require('express-async-handler');
const Muse = require('../models/Muse');
const SiteSettings = require('../models/SiteSettings');

// @desc    Get all muses and social settings
// @route   GET /api/muse
// @access  Public
const getMuses = asyncHandler(async (req, res) => {
    const muses = await Muse.find({ active: true });
    let settings = await SiteSettings.findOne({});
    if (!settings) {
        settings = await SiteSettings.create({});
    }
    res.json({ muses, settings });
});

// @desc    Add new muse
// @route   POST /api/muse
// @access  Private/Admin
const addMuse = asyncHandler(async (req, res) => {
    const muse = await Muse.create(req.body);
    res.status(201).json(muse);
});

// @desc    Delete muse
// @route   DELETE /api/muse/:id
// @access  Private/Admin
const deleteMuse = asyncHandler(async (req, res) => {
    const muse = await Muse.findById(req.params.id);
    if (muse) {
        await muse.deleteOne();
        res.json({ message: 'Muse erased from protocol' });
    } else {
        res.status(404);
        throw new Error('Muse not found');
    }
});

// @desc    Update social settings
// @route   PUT /api/muse/settings
// @access  Private/Admin
const updateSocialSettings = asyncHandler(async (req, res) => {
    const { socialPulseEnabled, socialPulseText, socialPulseFrequency } = req.body;
    let settings = await SiteSettings.findOne({});
    if (!settings) {
        settings = new SiteSettings({});
    }

    settings.socialPulseEnabled = socialPulseEnabled !== undefined ? socialPulseEnabled : settings.socialPulseEnabled;
    settings.socialPulseText = socialPulseText || settings.socialPulseText;
    settings.socialPulseFrequency = socialPulseFrequency || settings.socialPulseFrequency;

    await settings.save();
    res.json(settings);
});

// @desc    Bulk update muses
// @route   PUT /api/muse/bulk
// @access  Private/Admin
const bulkUpdateMuses = asyncHandler(async (req, res) => {
    const { muses } = req.body;
    for (const m of muses) {
        await Muse.findByIdAndUpdate(m._id, {
            location: m.location,
            text: m.text,
            image: m.image
        });
    }
    res.json({ message: 'Muses synchronized' });
});

module.exports = { getMuses, addMuse, deleteMuse, updateSocialSettings, bulkUpdateMuses };
