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
router.post('/', upload.reg.single('photo'), async (req, res) => {
    
    function generateMemberId(){
        var  batch = req.body.batch;
        var shift = req.body.shift;
        var section = req.body.section;
        var roll = req.body.roll;
        var shiftSymbol = shift.slice(0,1);
        var tempId = batch+"-"+shiftSymbol+"-"+section+"-"+roll.slice(2,20);
        var id = tempId.slice(4,20);
        return id;
    }
    let memberId = generateMemberId();
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let member = await db.getMemberById(memberId);
    if (member) return res.send('<br><br><br><h1>You are already registered<br>Check if you are available in the <a href="/members?type=table">member list</a><br> If you think someone else has registered with your information then contact with us.</h1>');
    member = await db.getMemberByEmail(req.body.email);
    if (member) return res.send('<br><br><br><h1>Someone has already registered with the given email address</h1>');
    member = await db.getMemberByPhone(req.body.phone);
    if (member) return res.send('<br><br><br><h1>Someone has already registered with the given phone number</h1>');

    member = _.pick(req.body, ['fname', 'lname', 'email', 'phone', 'batch', 'shift', 'section', 'roll', 'bio', 'password']);
    const createMember = async () => {
        if (express().get('env') != 'development') {
        const imgurLink = await imgur.uploadImg(`public/members-image/${req.file.filename}`);
        member.photo = [imgurLink, `${config.get('ftp.server-address')}/${req.file.filename}`];
        ftp.putFile(`public/members-image/${req.file.filename}`, `htdocs/test/${req.file.filename}`);
        }
        let salt = await bcrypt.genSalt(10);
        member.password = await bcrypt.hash(member.password, salt);
        member.memberId = generateMemberId();
        await db.createMember(member);
        if (express().get('env') != 'development') mailer.sendEmailToNewMember(member.email);
        res.send(thankYou);
    }
    createMember();
});



router.post('/update', auth, async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    let member = req.body;
    console.log(member);
    
    // member = await db.getMemberByEmail(req.body.email);
    // if (member) return res.send('<br><br><br><h1>Someone has already registered with the given email address</h1>');
    // member = await db.getMemberByPhone(req.body.phone);
    // if (member) return res.send('<br><br><br><h1>Someone has already registered with the given phone number</h1>');

    member = _.pick(req.body, ['fname', 'lname', 'email', 'phone', 'bio', 'fb', 'tw', 'ig', 'memberId']);
    result = await db.updateMemberInfo(member.memberId, member);
    res.redirect('/me');
});

router.get('/', (req, res) => {
    res.render('register', null);
});

module.exports = router;
