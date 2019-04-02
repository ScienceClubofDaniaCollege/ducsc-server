const multer  = require('multer')

const multerConfig = {
    
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public/members-image');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){
            // console.log(file);
            // console.log(req.body);

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
              console.log('Image uploaded to the server...');
              next(null, true);
            }else{
              console.log("file not supported");
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
      };
const upload = multer(multerConfig);
module.exports = upload;