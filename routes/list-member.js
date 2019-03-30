const db = require('../modules/db');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

// listing members enpoints
router.get('/', function (req, res) {
    async function sendMembers(){
        userData = await db.getMembers()
        const displayMembers =(type) => {
            res.render(`members-${type}`, userData);
        };
        displayMembers(req.query.type);
    }
    sendMembers()
});

module.exports = router;
