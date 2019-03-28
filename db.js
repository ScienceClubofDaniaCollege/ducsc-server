// all the neccessery packages
const config = require('config');
const mongoose = require('mongoose');
// connecting to db
const connectDB = () => {
    mongoose.connect(process.env.DSC_db, {
        useNewUrlParser: true
    }).then(() => console.log('Conected to DB...'));
}
const closeDB = () => {
    mongoose.connection.close().then(() => console.log('closed DB connection...'));
}
// creating schema and model
const memberSchema = new mongoose.Schema({
    fname: {type: String, required: true, lowercase: true},
    lname: {type: String, required: true, lowercase: true},
    email: {type: String, unique: true, required: true, lowercase: true},
    phone: {type: String, unique: true, required: true},
    roll: {type: Number, unique: true, required: true},
    bio: String,
    memberId: {type: String, unique: true, required: true},
    memberType: {type: String, default: 'Member'},
    batch: {type: String, required: true},
    shift: {type: String, required: true},
    section: {type: String, required: true},
    photo: {type: Array, required: true},
    socials: {type: {fb: String, tw: String, ig: String}, default: {fb: 'N/A', tw: 'N/A', ig: 'N/A'}},
    password: {type: String, required: true}
});
// setting model
const Member = mongoose.model(config.get('db-collection'), memberSchema);
// function for getting emails of all members
const getMembersEmail = async () => {
    allUsersD = await getMembers();
    let result = allUsersD.map(a => a.email);
    let fresult = result.toString();
    console.log(fresult);
    return fresult;
}
const getMembers = async () => {
    await connectDB();
    const result = await Member.find();
    await closeDB();
    // console.log(result);
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
exports.getMembers = getMembers;
exports.createMember = createMember;
exports.getMemberByLoginData = getMemberByLoginData;
exports.getMembersEmail = getMembersEmail;