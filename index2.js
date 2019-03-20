// const dbQuery = require('./allQueryFunction');
const mailer = require('./mailer');
const mailer = require('./mailer');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:false}));
const port = process.env.PORT || 3000;
app.set('view engine', 'pug')
app.set('views', './html')
var multer  = require('multer')
app.use('/static', express.static('public'));



const multerConfig = {
    
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){
            // console.log(file);
            console.log(req.body);

            function generateMemberId(){
                var batch = req.body.batch;
                var shift = req.body.shift;
                var section = req.body.section;
                var roll = req.body.roll;
                var shiftSymbol = shift.slice(0,1);
                var tempId = batch+"-"+shiftSymbol+"-"+section+"-"+roll.slice(2,20);
                var id = tempId.slice(4,20);
                return id;
            }
            var memberId = generateMemberId();
            const ext = file.mimetype.split('/')[1];
            // next(null, file.fieldname + '-' + file.originalname	+ '-' + Date.now()+ '-' + req + '.'+ext);
            next(null, memberId	+ '-' + Date.now()+'.'+ext);
          }
        }),   
        
        //A means of ensuring only images are uploaded. 
        fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const image = file.mimetype.startsWith('image/');
            if(image){
              console.log('photo uploaded');
              next(null, true);
            }else{
              console.log("file not supported");
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
      };


app.get('/', (req, res) => res.redirect('https://daniascienceclub.cf'));

app.post('/register', multer(multerConfig).single('photo'), (req, res) => {
    async function testG(){
    req.body.photo = req.file.filename;
    userData = await createMember(req.body);
    console.log(userData);  
    // mailer.sendEmailToNewUser(req.body.email);
    res.render('index', userData);
    }
    testG()

    
});

app.post('/login', (req, res) => {
    const sendUserData = async () => {
        userData = await getMemberByLoginData(req.body.email, req.body.password);
        console.log(userData);
        if (userData.length == 0){
        res.send("Wrong email or password");
        } else {res.render('index', userData);};
        
    }
    sendUserData();
});

app.get('/members', function (req, res) {
    async function testF(){
        userData = await getMembers();
        console.log(userData);
    res.render('index', userData)
        }
        testF()
  })


app.listen(port, () => console.log(`Listening on port ${port}! http://localhost:${port}/`));
// console.log(mailer.sendEmailToNewUser);
// mailer.sendEmailToNewUser('nurulhuda859g@gmail.com');