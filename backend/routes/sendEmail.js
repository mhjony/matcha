var nodemailer = require('nodemailer');

const sendEmail = (email, token) => {
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
    text: `Hello! Please click the following link to verify your email http://localhost:5000/verify?token=${token}`
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