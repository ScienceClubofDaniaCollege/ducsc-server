// all the packeges and their settings
const express = require('express');
const app = express();
const allroutes = require('./routes/allroutes')
const port = process.env.PORT || 3000;
app.set('view engine', 'pug')
app.use('/static', express.static('public'));
app.use('/', allroutes);

app.listen(port, () => console.log(`Listening on port ${port}! http://localhost:${port}/`));
