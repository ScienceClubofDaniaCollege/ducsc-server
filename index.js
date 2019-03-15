const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Yahoo I am working!'))
app.get('/register', (req, res) => {
    res.send(`<h3 align="center" bgcolor="pink"> Hi <span color="blue">${req.query.lname}<span> thank you for testing our form</h3>`);
    }
);
app.post('/login', (req, res) => {
    res.send(req.body.password);
    }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))