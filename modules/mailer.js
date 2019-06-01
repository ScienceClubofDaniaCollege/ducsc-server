const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: config.get('gmail.address'),
    pass: config.get('gmail.password')
    }
});

function sendEmailToNewMember(emailAddress){

    const mailOptions = {
        from: 'daniascienceclub@gmail.com',
        to: emailAddress,
        subject: 'Thank you for registering as a member of DSC',
        text: 'Thank You very much for registering as a member of Dania Science Club. Now you can login to our website and edit your profile from https://daniascienceclun.cf/html/member-area.html'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}
function sendEmailToAllMembers(subject, html, emails){
    const mailOptions = {
        from: 'daniascienceclub@gmail.com',
        bcc: emails,
        subject: subject,
        html: html
    };   
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log('failed to send email to all user', error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}
function sendEmailForPassReset(email, link){
    const mailOptions = {
        from: 'daniascienceclub@gmail.com',
        bcc: email,
        subject: 'Password Reset Request',
        html: 'Click on the link bellow to reset your password <br>' + link
    };   
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log('failed to send email to all user', error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}
exports.sendEmailToNewMember = sendEmailToNewMember;
exports.sendEmailToAllMembers = sendEmailToAllMembers;
exports.sendEmailForPassReset = sendEmailForPassReset;