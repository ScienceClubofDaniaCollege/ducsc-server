// all the neccessery packages
const { auth } = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { thankYou } = require('../modules/tempHTML');
const { validate } = require('../models/member');
const config = require('config');
const imgur = require('../modules/imgur');
const upload = require('../modules/multer');
const db = require('../modules/db');
const ftp = require('../modules/ftp');
const mailer = require('../modules/mailer');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));
// login and registration endpoints

router.get('/', (req, res) => {
    
    res.send('Feedback recieved! Here is what we got: '+JSON.stringify(req.query));
});

module.exports = router;
