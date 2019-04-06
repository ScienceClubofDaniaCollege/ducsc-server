const jwt = require('jsonwebtoken');
const admin = require('../middleware/admin');
const { auth } = require('../middleware/auth');
const config = require('config')
const db = require('../modules/db');
const express = require('express');
const router = express.Router();
const mailer = require('../modules/mailer');

router.get('/send-email', [auth, admin], (req, res) => {
    res.render('send-mail', null)
});
router.get('/',[auth, admin],  (req, res) => {
    res.render('admin', null)
});

router.get('/emails',[auth, admin], async (req, res) => {
    const result = await db.getMembersEmail();
    res.send(result);
});
// listing members enpoints
router.get('/approve-members',[auth, admin], function (req, res) {
    async function sendMembers(){
        userData = await db.getPendingMembers()
        const displayMembers =() => {
            res.render('approve-members', userData);
        };
        displayMembers();
    }
    sendMembers()
});
router.get('/make-admin',[auth, admin], function (req, res) {
    async function sendMembers(){
        userData = await db.getMembers()
        const displayMembers =() => {
            res.render('make-admin', userData);
        };
        displayMembers();
    }
    sendMembers()
});
// Email associated endpoints
router.post('/send-email',[auth, admin], async (req, res) => {
    if (req.body.password === config.get('admin.password')) {
        const allMembersEmail = await db.getMembersEmail();
        mailer.sendEmailToAllMembers(req.body.subject, req.body.html, allMembersEmail);
        res.status(200).send('email sent')   
    };
    res.status(400).send('Invalid admin password. Contact with <a href="https://fb.me/nurulhuda859">Nurul Huda</a> to get the password.')

});
router.post('/approve-members', [auth, admin],async function (req, res) {
    const result = await db.approveMember(req.body.memberId);
    if (result){
        res.redirect('approve-members')
    }
    else { res.send('Could not approve member')}
});
router.post('/make-admin', [auth, admin],async function (req, res) {
    const result = await db.makeAdmin(req.body.memberId);
    if (result){
        res.send('make-admin')
    }
    else { res.send('Could not approve member')}
});

module.exports = router;