// all the packeges and their settings
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const register = require('./routes/register')
const db = require('./modules/db')
const login = require('./routes/login')
const admin = require('./routes/admin')
const home = require('./routes/home')
const listMember = require('./routes/list-member')

const port = process.env.PORT || 3000;

app.use('/static', express.static('public'));

app.set('view engine', 'pug')

app.use(cookieParser());
app.use('/', home);
app.use('/members', listMember);
app.use('/register', register);
app.use('/login', login);
app.use('/admin', admin);

db.connect();
const ip = require('ip');
app.listen(port, () => console.log(`Listening on port ${port}! http://${ip.address()}:${port}/`));
// console.log(process.env.NODE_ENV != 'development');
// console.log(app.get('env') != 'development');
// console.log(express().get('env'));
// console.log((express().get('env') != 'development'));
// console.log((express().get('env')));

