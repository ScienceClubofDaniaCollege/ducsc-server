const express = require('express')
const app = express()
app.use(express.urlencoded());
const port = process.env.PORT || 3000

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