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
const closeDB = () => {
    mongoose.connection.close().then(() => console.log('Closed connection of MongoDB...'));
};

// function for getting emails of all members
const getMembersEmail = async () => {
    members = await getMembers();
    let result = members.map(a => a.email).toString();
    return result;
};

const getMembers = async () => {
    await connectDB();
    const result = await Member.find();
    await closeDB();
    return result;
};
// function for creating member
const createMember = async (memberInfo) => {
    await connectDB();
    const member = new Member(memberInfo);
    const result = await member.save();
    await closeDB();
    return result;
};
const getMemberByLoginData = async (memberEmail, memberPassword) => {
    await connectDB();
    const result = await Member.find({
        email: memberEmail,
        password: memberPassword
    });
    await closeDB();
    return result;
};
const getPendingMembers = async (memberEmail, memberPassword) => {
    await connectDB();
    const result = await Member.find({
        isApproved: false
    });
    await closeDB();
    return result;
};
const approveMember = async (memberId) => {
    await connectDB();
    const result = await Member.updateOne({memberId: memberId}, {
        $set:{
            isApproved: true
            }
        });
    console.log(result);
    await closeDB();
    return result;
};
exports.getMembers = getMembers;
exports.createMember = createMember;
exports.getMemberByLoginData = getMemberByLoginData;
exports.approveMember = approveMember;
exports.getMembersEmail = getMembersEmail;
exports.getPendingMembers = getPendingMembers;