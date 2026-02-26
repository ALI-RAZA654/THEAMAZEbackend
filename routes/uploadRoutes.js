const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const router = express.Router();

const upload = multer({
    storage: storage
});

router.post('/', upload.single('image'), (req, res) => {
    // req.file contains the Cloudinary file details
    if (!req.file) {
        return res.status(400).send('No image provided');
    }

    res.send({
        status: 'success',
        // Support frontend receiving 'path' or 'url'
        path: req.file.path,
        url: req.file.path
    });
});

module.exports = router;
