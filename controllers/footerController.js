const asyncHandler = require('express-async-handler');
const Footer = require('../models/Footer');

// @desc    Get footer configuration
// @route   GET /api/footer
// @access  Public
const getFooter = asyncHandler(async (req, res) => {
    let footer = await Footer.findOne({});
    if (!footer) {
        footer = await Footer.create({
            description: "Architecting high-conversion fashion identities for the year 2026.",
            copyright: "© 2026 THE AMAZE FASHION PROTOCOL. ALL RIGHTS SECURED.",
            socials: { facebook: '#', instagram: '#', tiktok: '#' },
            sections: { showNavigation: true, showDigital: true, showLegal: true },
            contact: {
                phone: '+1 (888) AMAZE-26',
                email: 'officialtheamaze@gmail.com',
                location: 'Tokyo / Paris / New York'
            }
        });
    }
    res.json(footer);
});

// @desc    Update footer configuration (Admin only)
// @route   PUT /api/footer
// @access  Private/Admin
const updateFooter = asyncHandler(async (req, res) => {
    const { description, copyright, socials, sections, contact } = req.body;
    let footer = await Footer.findOne({});

    if (!footer) {
        footer = new Footer({});
    }

    footer.description = description !== undefined ? description : footer.description;
    footer.copyright = copyright !== undefined ? copyright : footer.copyright;
    footer.socials = socials !== undefined ? socials : footer.socials;
    footer.sections = sections !== undefined ? sections : footer.sections;
    footer.contact = contact !== undefined ? contact : footer.contact;

    const updatedFooter = await footer.save();
    res.json(updatedFooter);
});

module.exports = { getFooter, updateFooter };
