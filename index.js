// all the packeges and their settings
const ftp = require('./ftp');
const mailer = require('./mailer');
const db = require('./db');
const upload = require('./multer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'pug')
app.set('views', './pug')
app.use('/static', express.static('public'));
app.use(express.urlencoded({extended:false}));
// all the endpoints
app.get('/', (req, res) => res.redirect('https://daniascienceclub.cf'));
app.post('/register', upload.single('photo'), (req, res) => {
    const createMember2 = async () => {
        req.body.photo = req.file.filename;
        await db.createMember(req.body);
    }
    createMember2();
    ftp.putFile(`public/members-image/${req.file.filename}`, `htdocs/test/${req.file.filename}`);
    res.redirect('https://daniascienceclub.cf/html/login.html')
});
app.post('/login', (req, res) => {
    const sendMemberData = async () => {
        userData = await db.getMemberByLoginData(req.body.email, req.body.password);
        console.log(userData);
        if (userData.length == 0){
        res.status(404).send("Wrong email or password");
        } else {res.render('members-card', userData);};
    }
    sendMemberData();
});
app.get('/login', (req, res) => {
    res.render('login', null)  
});
app.get('/members', function (req, res) {
    async function sendMembers(){
        userData = await db.getMembers()
        const displayMembers =(type) => {
        res.render(`members-${type}`, userData);
        };
        displayMembers(req.query.type);
    }
        sendMembers()
  });
app.listen(port, () => console.log(`Listening on port ${port}! http://localhost:${port}/`));
