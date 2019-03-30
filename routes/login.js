const db = require('../modules/db');
const express = require('express');
const router = express.Router();

const Joi = require('joi');

router.use(express.urlencoded({extended: true}));

// login and registration endpoints
router.post('/', (req, res) => {
    const sendMemberData = async () => {
        userData = await db.getMemberByLoginData(req.body.email, req.body.password);
        if (userData.length == 0){
        res.status(404).send("Wrong email or password");
    } else {res.render('members-card', userData);};
    }
    sendMemberData();
});

router.get('/login', (req, res) => {
    res.render('login', null)  
});

module.exports = router;