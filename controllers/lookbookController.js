const asyncHandler = require('express-async-handler');
const Lookbook = require('../models/Lookbook');

// @desc    Get lookbook configuration
// @route   GET /api/lookbook
// @access  Public
const getLookbook = asyncHandler(async (req, res) => {
    let lookbook = await Lookbook.findOne({});
    if (!lookbook) {
        lookbook = await Lookbook.create({
            videoLink: 'istockphoto-1095664718-640_adpp_is.mp4',
            isEnabled: true
        });
    }
    res.json(lookbook);
});

// @desc    Update lookbook configuration (Admin only)
// @route   PUT /api/lookbook
// @access  Private/Admin
const updateLookbook = asyncHandler(async (req, res) => {
    const { videoLink, isEnabled } = req.body;
    let lookbook = await Lookbook.findOne({});

    if (!lookbook) {
        lookbook = new Lookbook({});
    }

    lookbook.videoLink = videoLink !== undefined ? videoLink : lookbook.videoLink;
    lookbook.isEnabled = isEnabled !== undefined ? isEnabled : lookbook.isEnabled;

    const updatedLookbook = await lookbook.save();
    res.json(updatedLookbook);
});

module.exports = { getLookbook, updateLookbook };
