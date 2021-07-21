const { response } = require('express');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bakingbella7@gmail.com',
    pass: 'Capstone2021'
  }
});


const sendEmail = function(req,res){
    const to = req.params.to;
    const subject = req.params.subject;
    const body = req.params.body+req.params[0];
    
    var mailOptions = {
        from: 'bakingbella7@gmail.com',
        to: to,
        subject: subject,
        html: body
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        res.status(404).json(error);
    } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json('Email sent successfully');
    }
    });
}

module.exports = {
    sendEmail
}