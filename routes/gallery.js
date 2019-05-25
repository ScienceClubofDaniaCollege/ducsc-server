// all the neccessery packages
const { auth } = require('../middleware/auth');
const _ = require('lodash');
const config = require('config');
const imgur = require('../modules/imgur');
const upload = require('../modules/multer');
const db = require('../modules/db');
const ftp = require('../modules/ftp');
const mailer = require('../modules/mailer');
const express = require('express');
const router = express.Router();
const { Gallery, validate } = require('../models/gallery');

// login and registration endpoints
router.post('/', auth, upload.upd.single('newImage'), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const imgurLink = await imgur.uploadImg(`public/gallery-image/${req.file.filename}`);
        const newImages = { photo: [imgurLink, `${config.get('ftp.server-address')}/${req.file.filename}`] }
        const gallery = new Gallery(req.body);
        const result = await gallery.save();
        console.log(result);

        ftp.putFile(`public/gallery-image/${req.file.filename}`, `htdocs/test/${req.file.filename}`);
        res.send('Gallery image added');
    }
    catch {
        res.send('Failed to update image...')
    }
});


router.get('/', async (req, res) => {
    const result = await Gallery.find();
    res.json(result);
});

module.exports = router;
