const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'daniascienceclub@gmail.com',
    pass: process.env.DSC_gmail_pass
    }
});
function sendEmailToNewMember(emailAddress){

    const mailOptions = {
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
function sendEmailToAllMembers(subject, html){
    const mailOptions = {
        from: 'daniascienceclub@gmail.com',
        to: allMembersEmail,
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
exports.sendEmailToNewMember = sendEmailToNewMember;
exports.sendEmailToAllMembers = sendEmailToAllMembers;