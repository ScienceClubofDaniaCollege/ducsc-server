const mailer = require('./mailer');
const db = require('./db');
const upload = require('./multer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'pug')
app.set('views', './html')
app.use('/static', express.static('public'));
app.use(express.urlencoded({extended:false}));




app.get('/', (req, res) => res.redirect('https://daniascienceclub.cf'));

app.post('/register',upload.multer(multerConfig).single('photo'), (req, res) => {
    const createMember2 = async () => {
        req.body.photo = req.file.filename;
        await db.createMember(req.body);
    }
    createMember2();
    res.redirect('https://daniascienceclub.cf/html/login.html')
});

app.post('/login', (req, res) => {
    const sendMemberData = async () => {
        userData = await db.getMemberByLoginData(req.body.email, req.body.password);
        console.log(userData);
        if (userData.length == 0){
        res.status(404).send("Wrong email or password");
        } else {res.render('index', userData);};
    }
    sendMemberData();
});

app.get('/members', function (req, res) {
    async function sendMembers(){
        userData = await db.getMembers();
        console.log(userData);
    res.render('index', userData)
        }
        sendMembers()
  })


app.listen(port, () => console.log(`Listening on port ${port}! http://localhost:${port}/`));
console.log(upload);
