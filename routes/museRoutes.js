const express = require('express');
const router = express.Router();
const { getMuses, addMuse, deleteMuse, updateSocialSettings, bulkUpdateMuses } = require('../controllers/museController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getMuses)
    .post(protect, admin, addMuse);

router.put('/settings', protect, admin, updateSocialSettings);
router.put('/bulk', protect, admin, bulkUpdateMuses);

router.delete('/:id', protect, admin, deleteMuse);

module.exports = router;
