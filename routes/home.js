const db = require('../modules/db');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

// Home endpoint
router.get('/', (req, res) => res.send('https://daniascienceclub.cf'));


router.get('/test', (req, res) => res.render('test'));

module.exports = router;
