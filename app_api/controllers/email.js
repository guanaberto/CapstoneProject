const { response } = require('express');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bakingbellabakery@gmail.com',
    pass: 'Unhackable2021@'
  }
});


const sendEmail = function(req,res){
    const to = req.params.to;
    const subject = req.params.subject;
    const body = req.params.body+req.params[0];
    
    var mailOptions = {
        from: 'bakingbellabakery@gmail.com',
        to: to,
        subject: subject,
        html: body
    };

    console.log(body);
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