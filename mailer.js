var nodemailer = require('nodemailer');

function sendEmailToNewUser(emailAddress){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'daniascienceclub@gmail.com',
        pass: 'Dsc338899'
        }
    });
    
    var mailOptions = {
        from: 'daniascienceclub@gmail.com',
        to: emailAddress,
        subject: 'Thank you for registering as a member of DSC',
        text: 'Thank You very much for registering as a member of Dani Science Club. We have collected your data but for now you can not login but soon you can do that.'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

}
exports.module = sendEmailToNewUser;