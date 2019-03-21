const mongoose = require('mongoose');
// connecting to db
const connectDB = () => {mongoose.connect('mongodb://dsc:DNYs67BakjfdBB3@ds261527.mlab.com:61527/dsc-member_list',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));}
const closeDB = () => {mongoose.connection.close().then(()=> console.log('closed DB connection...'));}
// creating schema and model
const memberSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    roll: Number,
    message: String,
    memberId: String,
    batch: String,
    shift: String,
    section: String,
    photo: String,
    password: String});

    const Member = mongoose.model('Test5-Members', memberSchema);

const getMembersEmail = async () => {
    allUsersD = await getMembers();
    let result = allUsersD.map(a => a.email);
    let fresult = result.toString();
    // console.log(fresult);
    return fresult;
    }
    

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
    const result = await Member.find({email:memberEmail, password: memberPassword});
    await closeDB();
    return result;
};

exports.getMembers = getMembers;
exports.createMember = createMember;
exports.getMemberByLoginData = getMemberByLoginData;