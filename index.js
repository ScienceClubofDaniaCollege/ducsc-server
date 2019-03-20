// const dbQuery = require('./allQueryFunction');
const mailer = require('./mailer');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:false}));
const port = process.env.PORT || 3000;
// const getMembers = require('./register')
// db pass: DNYs67BakjfdBB3, db_user: dsc

var multer  = require('multer')
// var upload = multer({ dest: 'uploads/members-photo/' })
 


// app.use(express.static('public'));
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

            console.log(memberId);
            


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










// connecting to db
const connectDB = () => {
    mongoose.connect('mongodb://dsc:DNYs67BakjfdBB3@ds261527.mlab.com:61527/dsc-member_list',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));
    }
// creating schema and model
const memberSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    roll: Number,
    message: String,
    memberId: String,
    batch: String,
    shift: String,
    section: String,
    photo: String,
    password: String});

    const Member = mongoose.model('Test3-Members', memberSchema);



const getMembers = async () => {
    await connectDB();
    const result = await Member.find();
    await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    return result;
};

const getMembersEmail = async () => {
    allUsersD = await getMembers();
    let result = allUsersD.map(a => a.email);
    let fresult = result.toString();
    // console.log(fresult);
    return fresult;
    }
    

// function for creating member
    const createMember = async (memberInfo) => {
        await connectDB();


    


        let member = new Member(memberInfo);
        const result = await member.save();
        console.log(result);
        mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    };
// function for getting all members
    // const getMembers = async () => {
    //     await connectDB();
    //     const result = await Member.find();
    //     await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    //     return result;
    // };
    // function for getting member by login data

    const getMemberByLoginData = async (memberEmail, memberPassword) => {
        await connectDB();
        const result = await Member.find({email:memberEmail, password: memberPassword});
        await mongoose.connection.close().then(()=> console.log('closed DB connection...'));
        return result;
    };
// function for getting member by email

    let reqUser = "requested user";
    const getMemberByEmail = async (memberEmail) => {
        connectDB();

        const result = await Member.find({email: memberEmail});
        reqUser = result;
        mongoose.connection.close().then(()=> console.log('closed DB connection...'));
    };
// function for getting member by password

    const getMemberByPassword = async (memberPassword) => {
        connectDB();

        const result = await Member.find({password: memberPassword});
        reqUser = result;
        mongoose.connection.close().then(()=> console.log('closed DB connection...'));

    };

    
app.get('/', (req, res) => res.redirect('https://daniascienceclub.cf'));


// app.get('/members/:email', (req, res) => {
//     getMemberByEmail(req.params.email);
//     console.log(reqUser);
//     res.send(JSON.stringify(reqUser));
// });

app.get('/members/:password', (req, res) => {
    getMemberByPassword(req.params.password);
    console.log(reqUser);
    res.send(JSON.stringify(reqUser));
});

app.post('/register', multer(multerConfig).single('photo'), (req, res) => {
    console.log(req.file.filename); 
    req.body.photo = req.file.filename;
    console.log(req.body);
         
    createMember(req.body);
    mailer.sendEmailToNewUser(req.body.email);
    res.send(`
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    </head>
    </body>
    <h3 align="center" style="background-color:pink;"> Hi <em>${req.body.lname}</em> thank you for registering</h3>Your submitted data has been collected. Check them out bellow.<br>
    <img align="center" src="http://dscapi.herokuapp.com/static/${req.file.filename}" width="200px" height="auto">
    <h1 color="red">You will be redirected to the login page in 10 seconds.</h1>
    <p>${JSON.stringify(req.body)}</p>
    <script>setTimeout(function () {window.location = "https://daniascienceclub.cf/html/login.html";}, 9000);</script>
    </body>
    </html>`);
});

app.post('/login', (req, res) => {
    const sendUserData = async () => {
        const userData = await getMemberByLoginData(req.body.email, req.body.password);
        console.log(userData);
        if (userData.length == 0){
        res.send("Wrong email or password");
        } else {res.send(JSON.stringify(userData));};
        
    }
    sendUserData();
});


app.get('/member', (req, res) => {
    const sendUserData = async () => {
        const userData = await getMemberByLoginData(req.query.email, req.query.password);
        console.log(userData);
        res.send(JSON.stringify(userData));
    }
    sendUserData();
});
app.get('/members', (req, res) => {
    async function testF(){
    allUsersD = await getMembers();
    console.log(allUsersD);
    res.send(JSON.stringify(allUsersD));
    }
    testF()

});

app.listen(port, () => console.log(`Listening on port ${port}! http://localhost:${port}/`));
// console.log(mailer.sendEmailToNewUser);
// mailer.sendEmailToNewUser('nurulhuda859g@gmail.com');