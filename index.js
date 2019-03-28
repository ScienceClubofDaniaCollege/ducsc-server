// all the packeges and their settings
const allroutes = require('./routes/allroutes')
const home = require('./routes/home')
const upload = require('./multer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'pug')
app.use('/static', express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use('/i', home);
app.use('/', allroutes);

const db = require('./db');


app.listen(port, () => console.log(`Listening on port ${port}! http://localhost:${port}/`));
