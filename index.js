const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Yahoo I am working!'))
app.get('/register', (req, res) => {
    res.send(`<h3 align="center" style="background-color:pink;"> Hi <em>${req.query.lname}</em> thank you for testing our form</h3>. Checkout your submitted data bellow<br>
    first name: ${req.query.fname}<br>
    last name: ${req.query.lname}<br>
    email: ${req.query.email}<br>
    password: ${req.query.password}<br>
    batch: ${req.query.batch}<br>
    shift: ${req.query.shift}<br>
    section: ${req.query.section}`);
    }
);
app.get('/login', (req, res) => {
    let loginData = {email: req.query.email, password: req.query.password};
    res.send(`Login is not yer implemented. Checkout your submitted data bellow<br>
    email: ${req.query.email}<br>
    password: ${req.query.password}`);
    }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))