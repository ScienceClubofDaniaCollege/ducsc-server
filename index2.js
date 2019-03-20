const mailer = require('./mailer');
const db = require('./modules');
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
// console.log(db);
