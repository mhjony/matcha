const reportRouter = require('express').Router()
const db = require('../utils/db')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET

reportRouter.post('/', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('INSERT INTO report (from_user_id, to_user_id) VALUES ($1, $2)',
		[user.user_id, req.body.to_user_id], (error, result) => {

			if (result) {
				db.query('UPDATE users SET fame = fame - 5 WHERE user_id = $1',
					[req.body.to_user_id], (err, results) => {
						if (results)
							resp.status(204).end()
						else
							resp.status(500).send(err)
					})
			}
			else if (error.code === '23505')
				resp.status(204).end()
			else
				resp.status(500).send(error)
		})


})

module.exports = reportRouter