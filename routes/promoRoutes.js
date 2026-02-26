const express = require('express');
const router = express.Router();
const {
    getPromos, validatePromo, createPromo, deletePromo,
    updateMarquee, toggleMarquee, getPublicPromo
} = require('../controllers/promoController');

router.get('/public', getPublicPromo);
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getPromos)
    .post(protect, admin, createPromo)
    .put(protect, admin, updateMarquee);

router.patch('/toggle', protect, admin, toggleMarquee);

router.post('/validate', validatePromo);

// 🆕 Delete Route Added!
router.route('/:id').delete(protect, admin, deletePromo);

module.exports = router;
