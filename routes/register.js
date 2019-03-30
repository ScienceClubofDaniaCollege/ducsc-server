const config = require('config');
const imgur = require('../modules/imgur');
const upload = require('../modules/multer');
const db = require('../modules/db');
const ftp = require('../modules/ftp');
const mailer = require('../modules/mailer');
const express = require('express');
const router = express.Router();

const Joi = require('joi');

router.use(express.urlencoded({extended: true}));
// login and registration endpoints
router.post('/', upload.single('photo'), (req, res) => {
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


router.get('/', (req, res) => {
    res.render('register', null);
});



module.exports = router;