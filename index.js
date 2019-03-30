// all the packeges and their settings
const express = require('express');
const app = express();
const register = require('./routes/register')
const login = require('./routes/login')
const admin = require('./routes/admin')
const home = require('./routes/home')
const listMember = require('./routes/list-member')

const port = process.env.PORT || 3000;

app.use('/static', express.static('public'));

app.set('view engine', 'pug')

app.use('/', home);
app.use('/members', listMember);
app.use('/register', register);
app.use('/login', login);
app.use('/admin', admin);

app.listen(port, () => console.log(`Listening on port ${port}! http://localhost:${port}/`));
