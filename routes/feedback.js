// all the neccessery packages
const {Feedback} = require('../models/feedback')
const _ = require('lodash');
const { validate } = require('../models/feedback');
const express = require('express');
const router = express.Router();


router.use(express.urlencoded({extended: true}));
// login and registration endpoints

router.get('/', async (req, res) => {
    const { error } = validate(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    let feedbackInfo = _.pick(req.query, ['name', 'email', 'message']);
    const feedback = new Feedback(feedbackInfo);
    const result = await feedback.save();
    res.send('Feedback recieved! Here is what we saved: ' + result);
});

module.exports = router;
