const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../utils/db')
const tokenSecret = require('../utils/config').TOKEN_SECRET

loginRouter.post('/', (request, response) => {
    const body = request.body;
    db.query("SELECT * FROM users WHERE username= $1", [body.username], async (err, res) => {

		if (err)
			return response.status(500).send(err)
		if (res.rowCount === 0)
        	return response.status(401).send({ error: "Invalid username or password" })

		const hashedPass = res.rows[0].password;
		const matches = await bcrypt.compare(body.password, hashedPass)

		if (!matches)
			return response.status(401).send({ error: "Invalid username or password" })

		if (!res.rows[0].verified)
			return response.status(401).send({ error: "Account needs to be verified, check your email" })

		const userForToken = {
			username: res.rows[0].username,
			id: res.rows[0].user_id
		}

		const session_token = jwt.sign(userForToken, tokenSecret)
		response.header('auth-token', session_token).send({ ...res.rows[0], session_token })
	})
})

module.exports = loginRouter