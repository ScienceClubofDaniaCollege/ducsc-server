const db = require('../modules/db');
const express = require('express');
const router = express.Router();
const mailer = require('../modules/mailer');

router.get('/send-email', (req, res) => {
    res.render('send-mail', null)
});
router.get('/', (req, res) => {
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
// Email associated endpoints
router.post('/send-email', async (req, res) => {
    if (req.body.password === config.get('admin.password')) {
        const allMembersEmail = await db.getMembersEmail();
        mailer.sendEmailToAllMembers(req.body.subject, req.body.html, allMembersEmail);
        res.status(200).send('email sent')   
    };
    res.status(400).send('Invalid admin password. Contact with <a href="https://fb.me/nurulhuda859">Nurul Huda</a> to get the password.')

});
router.post('/approve-members', async function (req, res) {
    const result = await db.approveMember(req.body.memberId);
    if (result){
        res.send('Member approved!')
    }
    else { res.send('Could not approve member')}
});

module.exports = router;