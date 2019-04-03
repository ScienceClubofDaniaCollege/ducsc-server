const bcrypt = require('bcrypt');
const db = require('../modules/db');
const express = require('express');
const router = express.Router();

const Joi = require('joi');

router.use(express.urlencoded({extended: true}));

// login and registration endpoints
router.post('/', async (req, res) => {
        let member = await db.getMemberByEmail(req.body.email);
        console.log(member);
        
        if (!member) return res.status(400).send("<br><br><br><h1>Wrong email or password</h1>");
        const isValid = await bcrypt.compare(req.body.password, member.password);
        if (isValid) res.render('profile', member);
});

router.get('/', (req, res) => {
    res.render('login', null)  
});

module.exports = router;
