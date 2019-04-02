// all the neccessery packages
const {Member} = require('../models/member')
const config = require('config');
const mongoose = require('mongoose');

// connecting to db
const connectDB = () => {
    mongoose.connect(config.get('database.con-string'), {useCreateIndex: true,useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.error('Could not connect to MongoDB..'));
};
// const closeDB = () => {
//     mongoose.connection.close().then(() => console.log('Closed connection of MongoDB...'));
// };

// function for getting emails of all members
const getMembersEmail = async () => {
    members = await getMembers();
    let result = members.map(a => a.email).toString();
    return result;
};

const getMembers = async () => {
    const result = await Member.find();
    return result;
};
const getMemberById = async (memberId) => {
    const result = await Member.findOne({memberId: memberId});
    return result;
};
// function for creating member
const createMember = async (memberInfo) => {
    const member = new Member(memberInfo);
    const result = await member.save();
    return result;
};
const getMemberByLoginData = async (memberEmail, memberPassword) => {
    const result = await Member.find({
        email: memberEmail,
        password: memberPassword
    });
    return result;
};
const getPendingMembers = async (memberEmail, memberPassword) => {
    const result = await Member.find({
        isApproved: false
    });
    return result;
};
const approveMember = async (memberId) => {
    const result = await Member.updateOne({memberId: memberId}, {
        $set:{
            isApproved: true
            }
        });
    return result;
};
exports.getMembers = getMembers;
exports.getMemberById = getMemberById;
exports.createMember = createMember;
exports.getMemberByLoginData = getMemberByLoginData;
exports.approveMember = approveMember;
exports.getMembersEmail = getMembersEmail;
exports.getPendingMembers = getPendingMembers;
exports.connect = connectDB;