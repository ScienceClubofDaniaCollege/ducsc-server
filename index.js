const mongoose = require('mongoose');
const express = require('express')
const app = express()
app.use(express.urlencoded());
const port = process.env.PORT || 3000
// db pass: DNYs67BakjfdBB3, db_user: dsc

mongoose.connect('mongodb://dsc:DNYs67BakjfdBB3@ds261527.mlab.com:61527/dsc-member_list',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));

const coustomerSchema = new mongoose.Schema({name: String,phone: String,address: String,acc_date: {type: Date, default: Date.now}});
    let Coustomer = mongoose.model('Coustomers', coustomerSchema);

    const createCoustomer = async (coustomerInfo) => {
        let coustomer = new Coustomer(coustomerInfo);
        const result = await coustomer.save();
        // console.log(`New User${}`);
        getUserNumber();
    };
    

app.get('/', (req, res) => res.send('Yahoo I am working!'))
app.post('/register', (req, res) => {
    res.send(`<h3 align="center" style="background-color:pink;"> Hi <em>${req.body.lname}</em> thank you for testing our form</h3>Checkout your submitted data bellow<br>
    first name: ${req.body.fname}<br>
    last name: ${req.body.lname}<br>
    email: ${req.body.email}<br>
    password: ${req.body.password}<br>
    batch: ${req.body.batch}<br>
    shift: ${req.body.shift}<br>
    section: ${req.body.section}`);
    
    let user = {name: req.query.name,phone: req.query.phone,address: req.query.address}


    createCoustomer(user);
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