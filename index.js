const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Yahoo I am working!'))
app.get('/register', (req, res) => {
    console.log('Request recieved..');
    res.send(` Hi ${req.query.lname} thank you for testing our form`);
    }
);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))