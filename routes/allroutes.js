const config = require('config');
const imgur = require('../modules/imgur');
const upload = require('../modules/multer');
const db = require('../modules/db');
const ftp = require('../modules/ftp');
const mailer = require('../modules/mailer');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

// all the endpoints

// Home endpoint
router.get('/', (req, res) => res.send('https://daniascienceclub.cf'));

// login and registration endpoints
router.post('/register', upload.single('photo'), (req, res) => {
    const createMember = async () => {
        const link = await imgur.uploadImg(`public/members-image/${req.file.filename}`);
        req.body.photo = [link, `${config.get('ftp.server-address')}/${req.file.filename}`];
        await db.createMember(req.body);
        mailer.sendEmailToNewMember(req.body.email); 
    }
    createMember();
    ftp.putFile(`public/members-image/${req.file.filename}`, `htdocs/test/${req.file.filename}`);
    res.send(`<script type="text/javascript">   
    function Redirect() 
    {  
        window.location="/login"; 
    } 
    document.write("<h1 style='text-align:center;'><strong style='color:dodgerblue'>Thank you for registering.</strong>You will be redirected to the login page in 5 seconds</h1>"); 
    setTimeout('Redirect()', 5000);   
</script>`);
});


router.post('/login', (req, res) => {
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

// listing members enpoints
router.get('/members', function (req, res) {
    async function sendMembers(){
        userData = await db.getMembers()
        const displayMembers =(type) => {
            res.render(`members-${type}`, userData);
        };
        displayMembers(req.query.type);
    }
    sendMembers()
});

// Email associated endpoints
router.post('/send-email', async (req, res) => {
    if (req.body.password === config.get('admin.password')) {
        const allMembersEmail = await db.getMembersEmail();
        mailer.sendEmailToAllMembers(req.body.subject, req.body.html, allMembersEmail);
        res.status(200).send('email sent')   
    };
    res.status(400).send('Invalid admin password. Contact with <a href="https://fb.me/nurulhuda859">Nurul Huda</a> to get the password.')

});

router.get('/send-email', (req, res) => {
    res.render('send-mail', null)
});
router.get('/admin', (req, res) => {
    res.render('admin', null)
});

router.get('/emails', async (req, res) => {
    const result = await db.getMembersEmail();
    res.send(result);
});



// listing members enpoints
router.get('/approve-members', function (req, res) {
    async function sendMembers(){
        userData = await db.getPendingMembers()
        const displayMembers =() => {
            res.render('approve-members', userData);
        };
        displayMembers();
    }
    sendMembers()
});
router.post('/approve-members', async function (req, res) {
    const result = await db.approveMember(req.body.memberId);
    if (result){
        res.send('Member approved!')
    }
    else { res.send('Could not approve member')}
});


router.get('/register', (req, res) => {
    res.render('register', null);
});

router.get('/test', (req, res) => {

});

module.exports = router;
