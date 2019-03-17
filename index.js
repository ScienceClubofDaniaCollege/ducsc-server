const mongoose = require('mongoose');
const express = require('express')
const app = express()
app.use(express.urlencoded());
const port = process.env.PORT || 3000
// db pass: DNYs67BakjfdBB3, db_user: dsc

mongoose.connect('mongodb://dsc:DNYs67BakjfdBB3@ds261527.mlab.com:61527/dsc-member_list',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));

const memberSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    batch: String,
    shift: String,
    section: String,
    password: String});

    const Member = mongoose.model('Members', memberSchema);

    const createMember = async (memberInfo) => {
        let member = new Member(memberInfo);
        const result = await member.save();
        console.log(result);
    };
    let allUsers;
    const getMember = async () => {
        const result = await Member.find();
        allUsers = result;
    };
    

app.get('/', (req, res) => res.send('Yahoo I am working!'));

app.get('/members', (req, res) => {
   getMember();
    console.log(allUsers);
    
    res.send(JSON.stringify(allUsers));
});

app.post('/register', (req, res) => {
    console.log(req.body);      
    createMember(req.body);
    res.send(`<h3 align="center" style="background-color:pink;"> Hi <em>${req.body.lname}</em> thank you for registering</h3>Your submitted data has been collected. Check them out bellow.<br>` +
    JSON.stringify(req.body));
});

app.post('/login', (req, res) => {
    let loginData = {email: req.body.email, password: req.body.password};
    res.send(`Login is not yer implemented. Checkout your submitted data bellow<br>
    email: ${req.body.email}<br>
    password: ${req.body.password}`);
    }
);

app.listen(port, () => console.log(`Listening on port ${port}!`))