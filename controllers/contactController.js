const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const Subject = require('../models/Subject');
const sendEmail = require('../config/mailer');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
});

const submitContact = asyncHandler(async (req, res) => {
    const contact = new Contact(req.body);
    const created = await contact.save();

    try {
        await sendEmail({
            email: process.env.ADMIN_EMAIL || 'admin@theamaze.fashion',
            subject: `New Message from ${contact.name}: ${req.body.subject || 'Contact Form'}`,
            message: `You have received a new contact message via THE AMAZE.\n\nName: ${contact.name}\nEmail: ${contact.email}\nSubject: ${req.body.subject}\nMessage: ${contact.message}\n\nSent at: ${new Date().toLocaleString()}`
        });
    } catch (err) {
        console.error('Contact notification email failed:', err);
    }

    res.status(201).json(created);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
        await contact.deleteOne();
        res.json({ message: 'Message deleted' });
    } else {
        res.status(404);
        throw new Error('Contact message not found');
    }
});

// @desc    Get all subjects
// @route   GET /api/contact/subjects
// @access  Public
const getSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({ active: true });
    res.json(subjects);
});

// @desc    Create a subject
// @route   POST /api/contact/subjects
// @access  Private/Admin
const createSubject = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const subject = await Subject.create({ name });
    res.status(201).json(subject);
});

// @desc    Bulk update subjects (Admin only)
// @route   POST /api/contact/subjects/bulk
// @access  Private/Admin
const bulkUpdateSubjects = asyncHandler(async (req, res) => {
    const { subjects } = req.body; // Array of names

    // Simple approach: delete all and re-create
    await Subject.deleteMany({});

    const createdSubjects = await Subject.insertMany(
        subjects.map(name => ({ name }))
    );

    res.status(200).json(createdSubjects);
});

module.exports = { getContacts, submitContact, deleteContact, getSubjects, createSubject, bulkUpdateSubjects };
