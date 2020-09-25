var nodemailer = require('nodemailer');

const sendEmail = email => {
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testing.matcha',
        pass: 'matcha1234'
    }
    });

    var mailOptions = {
    from: 'testing.matcha@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

module.exports.sendEmail = sendEmail;