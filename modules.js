const mongoose = require('mongoose');
// connecting to db
const connectDB = () => {
    mongoose.connect('mongodb://dsc:DNYs67BakjfdBB3@ds261527.mlab.com:61527/dsc-member_list',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));
    }
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

    const Member = mongoose.model('Test3-Members', memberSchema);



const getMembers = async () => {
    await connectDB();
    const result = await Member.find();
    await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    return result;
};

const getMembersEmail = async () => {
    allUsersD = await getMembers();
    let result = allUsersD.map(a => a.email);
    let fresult = result.toString();
    // console.log(fresult);
    return fresult;
    }
    

// function for creating member
    const createMember = async (memberInfo) => {
        await connectDB();
        let member = new Member(memberInfo);
        const result = await member.save();
        mongoose.connection.close().then(()=> console.log('closed DB connection...'));
        return result;
    };

    const getMemberByLoginData = async (memberEmail, memberPassword) => {
        await connectDB();
        const result = await Member.find({email:memberEmail, password: memberPassword});
        await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
        return result;
    };
    