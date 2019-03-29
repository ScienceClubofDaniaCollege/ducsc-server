const mongoose = require('mongoose');
const config = require('config');
// creating schema and model
const memberSchema = new mongoose.Schema({
    fname: {type: String, required: true, lowercase: true},
    lname: {type: String, required: true, lowercase: true},
    email: {type: String, unique: true, required: true, lowercase: true},
    phone: {type: String, unique: true, required: true},
    batch: {type: String, required: true},
    shift: {type: String, required: true, enum: ['Morning', 'Day']},
    section: {type: String, required: true, enum: ['S1','S2','S3','S4']},
    roll: {type: Number, unique: true, required: true},
    bio: String,
    memberId: {type: String, unique: true, required: true},
    isApproved: {type: Boolean, default: false},
    memberType: {type: String, default: 'Member'},
    admin: {type: Boolean, default: false},
    photo: {type: Array, required: true},
    socials: {type: {fb: String, tw: String, ig: String}},
    password: {type: String, required: true}
});
// setting model
const Member = mongoose.model(config.get('database.cn'), memberSchema);

exports.Member = Member;