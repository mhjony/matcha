const likesRouter = require('express').Router()
const db = require('../utils/db')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET

likesRouter.get('/', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	let query = 'SELECT user_id, username, like_id, match FROM likes\
		INNER JOIN users ON to_user_id = user_id WHERE from_user_id = $1'
	const parameters = [user.user_id]

	if (req.query.to_user_id) {
		parameters.push(req.query.to_user_id)
		query = query.concat(` AND to_user_id = $${parameters.length}`)
	}

	if (req.query.match) {
		parameters.push(req.query.match)
		query = query.concat(` AND match = $${parameters.length}`)
	}

	db.query(query, parameters, (err, res) => {
		if (res)
			resp.status(200).send(res.rows)
		else
			resp.status(500).send({ error: err.detail })
	})

})

likesRouter.post('/', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('SELECT * from likes WHERE from_user_id = $1 AND to_user_id = $2\
	OR from_user_id = $2 AND to_user_id = $1;',
	[user.user_id, req.body.to_user_id], (err, res) => {

		if (res && res.rows[0]) {

			const userLike = res.rows.find(r => r.from_user_id === user.user_id)
			const matchLike = res.rows.find(r => r.to_user_id === user.user_id)

			if (userLike) {
				db.query('DELETE FROM likes WHERE like_id = $1',
					[userLike.like_id], (error, result) => {

						if (result && matchLike && matchLike.match)

							db.query('UPDATE likes SET match = 0 WHERE like_id = $1',
								[matchLike.like_id], (err, res) => {
									if (res)
										resp.status(200).send({ value: 0, status: 'unmatch' })
									else
										resp.status(500).send(err)
								})

						else if (result)
							resp.status(200).send({ value: 0, status: 'unlike' })

						else
							resp.status(500).send(error)
					})
			}
			else {

				db.query('INSERT INTO likes (from_user_id, to_user_id, match) VALUES ($1, $2, $3)\
				RETURNING *', [user.user_id, req.body.to_user_id, 1], (error, result) => {

					if (result) {
						db.query('UPDATE likes SET match = 1 WHERE like_id = $1',
							[matchLike.like_id], (err, res) => {
								if (res)
									resp.status(200).send({ value: 1, status: 'match' })
								else
									resp.status(500).send(err)
							})
					}
					else
						resp.status(500).send(error)
				})
			}

		}
		else if (res) {

			db.query('INSERT INTO likes (from_user_id, to_user_id, match) VALUES ($1, $2, $3)\
			RETURNING *', [user.user_id, req.body.to_user_id, 0], (error, result) => {
				if (result)
					resp.status(200).send({ value: 1, status: 'like' })
				else
					resp.status(500).send(error)
			})
		}
		else
			resp.status(500).send(err)
	})
})

module.exports = likesRouter
