const bcrypt = require('bcrypt');
const db = require('../modules/db');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

// login and registration endpoints
router.post('/', async (req, res) => {
    let member = await db.getOneMember({roll: req.body.roll});
    console.log(member);
    if (!member) return res.status(400).send("<br><br><br><h1>Wrong roll or password</h1>");
    let isValid = await bcrypt.compare(req.body.password, member.password);
    console.log(isValid);
    if (isValid) {
        const token = member.generateAuthToken();
        res.cookie('token', token).redirect('/me');
    } else {
        return res.status(400).send("<br><br><br><h1>Wrong roll or password</h1>");}
});

router.get('/', (req, res) => {
    res.render('login-roll', null)  
});

module.exports = router;
