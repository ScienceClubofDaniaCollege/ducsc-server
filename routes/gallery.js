// all the neccessery packages
const { auth } = require('../middleware/auth');
const _ = require('lodash');
const config = require('config');
const imgur = require('../modules/imgur');
var multer  = require('multer')
var upload = multer({ dest: 'public/gallery-image' })
const db = require('../modules/db');
const ftp = require('../modules/ftp');
const mailer = require('../modules/mailer');
const express = require('express');
const router = express.Router();
const { Gallery, validate } = require('../models/gallery');

// login and registration endpoints
router.post('/', upload.single('newImage'), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        req.body.src = await imgur.uploadImg(`public/gallery-image/${req.file.filename}`);
        req.body.thumb = [req.body.src.slice(0, -4), 's', req.body.src.slice(-4)].join('');
        const gallery = new Gallery(req.body);
        const result = await gallery.save();
        console.log(result);

        res.header({ 'Access-Control-Allow-Origin': '*'}).send('Gallery image added');
    }
    catch {
        res.header({ 'Access-Control-Allow-Origin': '*'}).send('Failed to update image...')
    }
});


router.get('/', async (req, res) => {
    if (req.query.cat) {
        res.header({ 'Access-Control-Allow-Origin': '*'}).json(await Gallery.find({category: req.query.cat}));
        return;
    }
    const result = await Gallery.find();
    res.header({ 'Access-Control-Allow-Origin': '*'}).json(result);
});

module.exports = router;
