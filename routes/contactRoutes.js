const express = require('express');
const router = express.Router();
const {
    getContacts,
    submitContact,
    deleteContact,
    getSubjects,
    createSubject
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', submitContact);
router.get('/subjects', getSubjects);

// Admin routes - Subjects
router.post('/subjects', protect, admin, createSubject);

// Admin routes - Messages
router.get('/', protect, admin, getContacts); // GET /api/contact (Admin only - returns all messages)

// Alias for /api/admin/contact
router.get('/admin', protect, admin, getContacts);

router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
