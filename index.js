var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const express = require('express')
const app = express()
app.use(express.urlencoded());
const port = process.env.PORT || 3000
// const getMembers = require('./register')
// db pass: DNYs67BakjfdBB3, db_user: dsc





function sendEmailToNewUser(emailAddress){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'daniascienceclub@gmail.com',
        pass: 'Dsc338899'
        }
    });
    
    var mailOptions = {
        from: 'daniascienceclub@gmail.com',
        to: emailAddress,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

}













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
    photo: Buffer,
    batch: String,
    shift: String,
    section: String,
    password: String});

    const Member = mongoose.model('New-Members', memberSchema);



const getMembers = async () => {
    await connectDB();
    const result = await Member.find();
    await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    return result;
};
// function for creating member
    const createMember = async (memberInfo) => {
        connectDB();
        let member = new Member(memberInfo);
        const result = await member.save();
        console.log(result);
        mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    };
// function for getting all members
    // const getMembers = async () => {
    //     await connectDB();
    //     const result = await Member.find();
    //     await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    //     return result;
    // };
    // function for getting member by login data

    const getMemberByLoginData = async (memberEmail, memberPassword) => {
        await connectDB();
        const result = await Member.find({email:memberEmail, password: memberPassword});
        await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
        return result;
    };
// function for getting member by email

    let reqUser = "requested user";
    const getMemberByEmail = async (memberEmail) => {
        connectDB();

        const result = await Member.find({email: memberEmail});
        reqUser = result;
        mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    };
// function for getting member by password

    const getMemberByPassword = async (memberPassword) => {
        connectDB();

        const result = await Member.find({password: memberPassword});
        reqUser = result;
        mongoose.connection.close().then(()=> console.log('closed DB connection...'));

    };

    

app.get('/', (req, res) => res.send('Yahoo I am working!'));


// app.get('/members/:email', (req, res) => {
//     getMemberByEmail(req.params.email);
//     console.log(reqUser);
//     res.send(JSON.stringify(reqUser));
// });

app.get('/members/:password', (req, res) => {
    getMemberByPassword(req.params.password);
    console.log(reqUser);
    res.send(JSON.stringify(reqUser));
});

app.post('/register', (req, res) => {
    console.log(req.body);      
    createMember(req.body);
    sendEmailToNewUser(req.body.email);
    res.send(`<h3 align="center" style="background-color:pink;"> Hi <em>${req.body.lname}</em> thank you for registering</h3>Your submitted data has been collected. Check them out bellow.<br>` +
    JSON.stringify(req.body));
});

app.post('/login', (req, res) => {
    const sendUserData = async () => {
        const userData = await getMemberByLoginData(req.body.email, req.body.password);
        console.log(userData);
        if (userData.length == 0){
        res.send("Wrong email or password");
        } else {res.send(JSON.stringify(userData));};
        
    }
    sendUserData();
});


app.get('/member', (req, res) => {
    const sendUserData = async () => {
        const userData = await getMemberByLoginData(req.query.email, req.query.password);
        console.log(userData);
        res.send(JSON.stringify(userData));
    }
    sendUserData();
});
app.get('/members', (req, res) => {
    async function testF(){
    allUsersD = await getMembers();
    console.log(allUsersD);
    res.send(JSON.stringify(allUsersD));
    }
    testF()

});

app.listen(port, () => console.log(`Listening on port ${port}!`))



