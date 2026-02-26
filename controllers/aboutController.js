const asyncHandler = require('express-async-handler');
const About = require('../models/About');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
const getAbout = asyncHandler(async (req, res) => {
    let about = await About.findOne({ singletonId: 'about' });

    // Seed defaults if empty
    if (!about) {
        about = await About.create({ singletonId: 'about' });
    }

    res.json(about);
});

// @desc    Update about content
// @route   PUT /api/about
// @access  Private/Admin
const updateAbout = asyncHandler(async (req, res) => {
    let about = await About.findOne({ singletonId: 'about' });

    if (!about) {
        about = new About({ singletonId: 'about' });
    }

    const updatableFields = [
        'storyTitle', 'storyText1', 'storyText2', 'storyImage',
        'philosophyText', 'engineeringText', 'legacyText',
        'materialsTitle', 'materialsText', 'materialsImage'
    ];

    updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
            about[field] = req.body[field];
        }
    });

    const updatedAbout = await about.save();
    res.json(updatedAbout);
});

module.exports = { getAbout, updateAbout };
