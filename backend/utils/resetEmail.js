const nodemailer = require('nodemailer')

const resetEmail = (email, token) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'testing.matcha',
			pass: 'matcha1234'
		}
	})

	//could add user_id to the verify address
	const mailOptions = {
		from: 'testing.matcha@gmail.com',
		to: email,
		subject: 'Reset your password',
		text: `Hello! Please click the following link to reset your password http://localhost:3000/reset-password/${token}`
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}

module.exports = { resetEmail }