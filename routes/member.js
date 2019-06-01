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
const {Member} = require('../models/member');
 
router.use(express.urlencoded({extended: true}));
// login and registration endpoints
router.post('/update-image',auth, upload.upd.single('newImage'), async (req, res) => {
    try {
        const imgurLink = await imgur.uploadImg(`public/members-image/${req.file.filename}`);
        const newImages = {photo: [imgurLink, `${config.get('ftp.server-address')}/${req.file.filename}`]}
        const result =await db.updateOneMember(req.member.memberId, newImages);
        ftp.putFile(`public/members-image/${req.file.filename}`, `htdocs/test/${req.file.filename}`);
        res.redirect('/me');
    }
    catch {
        res.send('Failed to update image...')
    }
});

router.get('/reset', async (req, res) => {
    let result = await Member.findOne({roll: req.query.roll});
    if (result) {
        let resetData = await Member.findOneAndUpdate({roll: req.query.roll}, {
            $set :{
                passwordReset: [Math.random(), Date.now()]
            }, new: true
        })
        let link = resetData.passwordReset[0];
        console.log(resetData + result);
        
        res.send('We sent you an email with a link to reset your password.')

        mailer.sendEmailForPassReset(result.email, link)
        return;
    }
    res.send('No member found with the given roll.')
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
