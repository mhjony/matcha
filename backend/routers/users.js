const usersRouter = require('express').Router()
const db = require('../utils/db')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

usersRouter.get('/', (req, resp) => {
	db.query('SELECT username, user_id FROM users', [], (err, res) => {
		if (err)
			resp.status(500).send(err)
		else
			resp.status(200).send(res.rows)
	})
})

usersRouter.get('/:id', (req, resp) => {

	db.query('SELECT * FROM users \
	LEFT OUTER JOIN photos USING (user_id) \
	WHERE users.user_id = $1', [req.params.id], (err, res) => {
		if (res && res.rows)
			resp.status(200).send(res.rows)
		else if (res)
			resp.status(500).send({ error: 'User not found' })
		else
			resp.status(500).send({ error: err.detail })
	})
})

usersRouter.post('/', async (req, resp) => {

	const sendEmail = (email, token) => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'testing.matcha',
				pass: 'matcha1234'
			}
		});

		//could add user_id to the verify address
		const mailOptions = {
			from: 'testing.matcha@gmail.com',
			to: email,
			subject: 'Sending Email using Node.js',
			text: `Hello! Please click the following link to verify your email http://localhost:3001/verify?token=${token}`
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}

	// LETS VALIDATE THE DATA BEFORE MAKE A USER and it comes from validation.js file
	//const { error } = registerValidation(req.body);
	//if (error) return res.status(400).send({ message: error.details[0].message });

	const { firstName, lastName, username, email, token } = req.body;

	// Hash password	
	const hashedPassword = await bcrypt.hash(req.body.password, 10)

	// Add user
	db.query('INSERT INTO users (first_name, last_name, username, email, password, token) \
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
		[firstName, lastName, username, email, hashedPassword, token],
		(err, res) => {
			if (res)
				resp.status(200).send(res.rows[0])
			else if (err.detail && err.detail.startsWith('Key (email)'))
				resp.status(409).send({ error: 'email already exists' })
			else if (err.detail && err.detail.startsWith('Key (username)'))
				resp.status(409).send({ error: 'username already exists' })
			else
				resp.status(500).send(err)
		})

	//send the email!
	sendEmail(email, token)
})

usersRouter.put('/:id', async (req, resp) => {
	const { firstName, lastName, username, email, gender, orientation, tags, bio } = req.body


	if (req.body.password) {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		db.query('UPDATE users \
			SET (first_name, last_name, username, email, gender, orientation, tags, bio, password) \
			= ($1, $2, $3, $4, $5, $6, $7, $8, $9) \
			WHERE user_id = $10 RETURNING *',
			[firstName, lastName, username, email, gender, orientation, tags, bio, hashedPassword, req.params.id],
			(err, res) => {

				if (res && res.rows[0])
					resp.status(200).send(res.rows[0])
				else if (res)
					resp.status(500).send({ error: 'User not found' })
				else if (err.detail && err.detail.startsWith('Key (email)'))
					resp.status(409).send({ error: 'email already exists' })
				else if (err.detail && err.detail.startsWith('Key (username)'))
					resp.status(409).send({ error: 'username already exists' })
				else
					resp.status(500).send(err)
			})

	} else {

		db.query('UPDATE users \
			SET (first_name, last_name, username, email, gender, orientation, tags, bio) \
			= ($1, $2, $3, $4, $5, $6, $7, $8) \
			WHERE user_id = $9 RETURNING *',
			[firstName, lastName, username, email, gender, orientation, tags, bio, req.params.id],
			(err, res) => {

				if (res && res.rows[0])
					resp.status(200).send(res.rows[0])
				else if (res)
					resp.status(500).send({ error: 'User not found' })
				else if (err.detail && err.detail.startsWith('Key (email)'))
					resp.status(409).send({ error: 'email already exists' })
				else if (err.detail && err.detail.startsWith('Key (username)'))
					resp.status(409).send({ error: 'username already exists' })
				else
					resp.status(500).send(err)
			})
	}
})

usersRouter.delete('/:id', (req, resp) => {
	db.query('DELETE FROM users WHERE user_id = $1', [req.params.id], () => {
		resp.status(204).end()
	})
})

usersRouter.get('/verify', (req, resp) => {
	db.query('SELECT * FROM users', [], (err, res) => {
		if (err)
			resp.status(500).send(err)
		else
			resp.status(200).send(res.rows)
	})
	/*console.log('req.query.token', req.params.token)
	db.query('UPDATE users SET verified = 1 WHERE token = $1',
		[req.params.token], (err, res) => {
			resp.redirect('http://localhost:3000')
	})*/
})

module.exports = usersRouter