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

    let Member = mongoose.model('Members', memberSchema);

    const createMember = async (memberInfo) => {
        let member = new Member(memberInfo);
        const result = await member.save();
        console.log(result);
    };
    const getMember = async () => {
        const result = await Member.find();
        console.log(result);
        
    };
    

app.get('/', (req, res) => res.send('Yahoo I am working!'));

app.get('/members', (req, res) => {getMember();
    res.send( result);
});

app.post('/register', (req, res) => {
let user = {fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                batch: req.body.batch,
                phone: req.body.phone,
                shift: req.body.shift,
                section: req.body.section,
                password: req.body.password}
                console.log(req.body);
                
    createMember(req.body);
    res.send(`<h3 align="center" style="background-color:pink;"> Hi <em>${user.lname}</em> thank you for registering</h3>Checkout your submitted has been collected.<br>
    first name: ${user.fname}<br>
    last name: ${user.lname}<br>
    email: ${user.email}<br>
    phone: ${user.phone}<br>
    password: ${user.password}<br>
    batch: ${user.batch}<br>
    shift: ${user.shift}<br>
    section: ${user.section}`+ JSON.stringify(req.body));


    }
        
);
app.post('/login', (req, res) => {
    let loginData = {email: req.body.email, password: req.body.password};
    res.send(`Login is not yer implemented. Checkout your submitted data bellow<br>
    email: ${req.body.email}<br>
    password: ${req.body.password}`);
    }
);

app.listen(port, () => console.log(`Listening on port ${port}!`))