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
        res.cookie('token', token, { maxAge: 1000*60*60*24*90 }).redirect('/me');
    } else {
        return res.status(400).send("<br><br><br><h1>Wrong roll or password</h1>");}
});

router.get('/', (req, res) => {
    // if (router.get('env') == 'development') {
    //     res.header({ 'Access-Control-Allow-Origin': 'http://localhost:5500', 'Access-Control-Allow-Credentials': 'true' }).json(member);
    //     return;
    // }
    res.header({ 'Access-Control-Allow-Origin': 'https://ducsc.github.io', 'Access-Control-Allow-Credentials': 'true' }).render('login-roll')  
});

module.exports = router;
