const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
// creating schema and model
const memberSchema = new mongoose.Schema({
    fname: {type: String, required: true, lowercase: true},
    lname: {type: String, required: true, lowercase: true},
    email: {type: String, lowercase: true},
    phone: {type: String, },
    batch: {type: String, required: true},
    shift: {type: String, required: true, enum: ['Morning', 'Day']},
    section: {type: String, required: true, enum: ['S1','S2','S3','S4']},
    roll: {type: String, unique: true, required: true},
    bio: String,
    memberId: {type: String, unique: true, required: true},
    isApproved: {type: Boolean, default: false},
    isSuper: {type: Boolean, default: false},
    memberType: {type: String, default: 'Member'},
    isAdmin: {type: Boolean, default: false},
    photo: {type: Array, required: true},
    socials: {type: {fb: String, tw: String, ig: String}, default:{fb: '', tw: '', ig:''} },
    password: {type: String, required: true}
});

memberSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({memberId: this.memberId, email: this.email, isAdmin: this.isAdmin, isApproved: this.isApproved}, 'pk');
    return token;
}
// setting model
const Member = mongoose.model(config.get('database.cn'), memberSchema);
// Joi validation
const validateMember = (memberInfo) => {
    const schema = {
            fname: Joi.string().min(2).max(50).required(),
            lname: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().min(2).max(50).required(),
            phone: Joi.string().length(11).required(),
            batch: Joi.string().min(6).max(6).required(),
            shift: Joi.string().min(2).max(50).valid('Day', 'Morning').required(),
            section: Joi.string().valid('S1', 'S2', 'S3', 'S4',).required(),
            roll: Joi.string().length(6).required(),
            bio: Joi.string().min(10).max(50).required(),
            memberId: Joi.string().required(),
            // photo: Joi.().min(2).max(50).required(),
            // socials: Joi.object().schema({fb: Joi.string(),tw: Joi.string(),ig: Joi.string(),}),
            password: Joi.string().min(6).max(255).required(),
    }
    return Joi.validate(memberInfo, schema);
}

exports.validate = validateMember;
exports.Member = Member;