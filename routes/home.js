const { auth } = require('../middleware/auth');
const db = require('../modules/db');
const express = require('express');
const router = express.Router();

const { Member } = require('../models/member')
const mongoose = require('mongoose');

router.use(express.urlencoded({ extended: true }));

// Home endpoint
router.get('/', (req, res) => res.send('https://daniascienceclub.ml'));


router.get('/test', (req, res) => res.render('test'));

router.get('/me', auth, async (req, res) => {
    let member = await db.getMemberById(req.member.memberId);
    res.render('profile', member);
});


router.get('/who/v1', auth, async (req, res) => {
    let member = await db.getMemberById(req.member.memberId);
    // if (router.get('env') == 'development') {
    //     res.header({ 'Access-Control-Allow-Origin': 'http://localhost:5500', 'Access-Control-Allow-Credentials': 'true' }).json(member);
    //     return;
    // }
    res.header({ 'Access-Control-Allow-Origin': 'https://daniascienceclub.ml', 'Access-Control-Allow-Credentials': 'true' }).json(member);
});
router.get('/who/v2', auth, async (req, res) => {
    res.header({ 'Access-Control-Allow-Origin': 'https://daniascienceclub.ml', 'Access-Control-Allow-Credentials': 'true' }).json(req.member);
});



router.get('/validation/:email', async (req, res) => {


    const result = await Member.findOne({ email: req.params.email });
    if (result) return res.send(true);
    res.status(404).send(false);
});

module.exports = router;
