const mongoose = require('mongoose');
const express = require('express')
const app = express()
app.use(express.urlencoded());
const port = process.env.PORT || 3000
// db pass: DNYs67BakjfdBB3, db_user: dsc

mongoose.connect('mongodb://dsc:DNYs67BakjfdBB3@ds261527.mlab.com:61527/dsc-member_list',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));

const memberSchema = new mongoose.Schema({fname: String,lname: String,email: String,batch: String, shift: String,section: String,password: String});
    let Member = mongoose.model('Members', memberSchema);

    const createMember = async (coustomerInfo) => {
        let member = new Member(coustomerInfo);
        const result = await member.save();
        console.log(result);
    };
    
// let testData = `<h3 align="center" style="background-color:pink;"> Hi <em>${req.body.lname}</em> thank you for testing our form</h3>Checkout your submitted data bellow<br>
// first name: ${req.body.fname}<br>
// last name: ${req.body.lname}<br>
// email: ${req.body.email}<br>
// password: ${req.body.section}<br>
// batch: ${req.body.batch}<br>
// shift: ${req.body.shift}<br>
// section: ${req.body.section}`

app.get('/', (req, res) => res.send('Yahoo I am working!'))
app.post('/register', (req, res) => {
let user = {fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                batch: req.body.batch,
                shift: req.body.shift,
                section: req.body.section,
                password: req.body.password}
    createMember(user);
    res.send(user);


    }
        
);
app.post('/login', (req, res) => {
    let loginData = {email: req.body.email, password: req.body.password};
    res.send(`Login is not yer implemented. Checkout your submitted data bellow<br>
    email: ${req.body.email}<br>
    password: ${req.body.password}`);
    }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))