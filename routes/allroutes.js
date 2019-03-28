const imgur = require('../imgur');
const upload = require('../multer');
const db = require('../db');
const ftp = require('../ftp');
const mailer = require('../mailer');

const express = require('express');
const router = express.Router();


router.use(express.urlencoded({extended: true}));
// all the endpoints
router.get('/', (req, res) => res.send('https://daniascienceclub.cf'));
router.get('/emails', async (req, res) => {
    const result = await db.getMembersEmail();
    res.send(result);
});

router.post('/register', upload.single('photo'), (req, res) => {
    const createMember2 = async () => {
        const link = await imgur.uploadImg(`public/members-image/${req.file.filename}`);
        req.body.photo = [link, req.file.filename];
        await db.createMember(req.body);
        mailer.sendEmailToNewMember(req.body.email);
        console.log(link);   
    }
    createMember2();
    ftp.putFile(`public/members-image/${req.file.filename}`, `htdocs/test/${req.file.filename}`);
    res.redirect('https://daniascienceclub.cf/html/login.html')
});
router.post('/login', (req, res) => {
    const sendMemberData = async () => {
        userData = await db.getMemberByLoginData(req.body.email, req.body.password);
        console.log(userData);
        if (userData.length == 0){
        res.status(404).send("Wrong email or password");
        } else {res.render('members-card', userData);};
    }
    sendMemberData();
});
router.get('/login', (req, res) => {
    res.render('login', null)  
});
router.get('/members', function (req, res) {
    async function sendMembers(){
        userData = await db.getMembers()
        const displayMembers =(type) => {
            // console.log(userData);
        res.render(`members-${type}`, userData);
        };
        displayMembers(req.query.type);
    }
        sendMembers()
  });

  router.post('/send-email', async (req, res) => {
    const allMembersEmail = await db.getMembersEmail();
    mailer.sendEmailToAllMembers(req.body.subject, req.body.html, allMembersEmail);
    res.status(200).send('email sent')
  });
  router.get('/send-email', (req, res) => {
    res.render('send-mail', null)
  });

module.exports = router;
