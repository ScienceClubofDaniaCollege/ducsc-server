const cookieParser = require('cookie-parser');
const { auth } = require('../middleware/auth');
const db = require('../modules/db');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

// Home endpoint
router.get('/', (req, res) => res.send('https://daniascienceclub.cf'));


router.get('/test', (req, res) => res.render('test'));

router.get('/me', auth, async (req, res) => {
    console.log('Me');
    
    let member = await db.getMemberById(req.member.memberId);
    res.render('profile', member);    
});

module.exports = router;
