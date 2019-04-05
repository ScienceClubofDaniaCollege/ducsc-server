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
const getMemberByPhone = async (phone) => {
    const result = await Member.findOne({phone: phone});
    return result;
};
const getMemberByEmail = async (email) => {
    const result = await Member.findOne({email: email});
    return result;
};
const getMemberByRoll = async (roll) => {
    const result = await Member.findOne({roll: roll});
    return result;
};
const getOneMember = async (query) => {
    const result = await Member.findOne(query);
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
    const result = await Member.updateOne({memberId: memberId}, {$set:{isApproved: true}});
    return result;
};
const updateMemberInfo = async (memberId, newInfo) => {
    const result = await Member.updateOne({memberId: memberId}, {
        $set:{
            fname: newInfo.fname,
            lname: newInfo.lname,
            email: newInfo.email,
            phone: newInfo.phone,
            bio: newInfo.bio,
            socials: {fb: newInfo.fb, tw: newInfo.tw, ig: newInfo.ig},
            isApproved: true
            }
        });
    return result;
};
exports.getMembers = getMembers;
exports.getMemberById = getMemberById;
exports.getMemberByPhone = getMemberByPhone;
exports.getMemberByEmail = getMemberByEmail;
exports.createMember = createMember;
exports.getMemberByLoginData = getMemberByLoginData;
exports.getOneMember = getOneMember;
exports.approveMember = approveMember;
exports.getMembersEmail = getMembersEmail;
exports.getPendingMembers = getPendingMembers;
exports.connect = connectDB;
exports.updateMemberInfo = updateMemberInfo;
