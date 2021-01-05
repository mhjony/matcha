const blockRouter = require('express').Router()
const db = require('../utils/db')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET

blockRouter.post('/', (req, resp) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('INSERT INTO blocked (from_user_id, to_user_id) VALUES ($1, $2) RETURNING *',
		[user.user_id, req.body.to_user_id], (err, res) => {
			if (res) {
				db.query('DELETE FROM likes WHERE (from_user_id = $1 AND to_user_id = $2)\
				OR (from_user_id = $2 AND to_user_id = $1)', [user.user_id, req.body.to_user_id],
				(error, response) => {
					if (response)
						resp.status(200).send(res.rows)
					else
						resp.status(500).send(error)
				})

			}
			else if (err.code === '23505')
				resp.status(204).end()
			else
				resp.status(500).send(err)
		})
})

blockRouter.get('/', (req, resp) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user || req.query.from_user_id && Number(req.query.from_user_id) !== user.user_id)
		return resp.status(401).json({ error: 'token missing or invalid' })

	let query
	const parameters = [user.user_id]

	if (req.query.from_user_id)
		query = 'SELECT username, block_id, from_user_id, to_user_id FROM users, blocked\
		WHERE from_user_id = $1 AND user_id = to_user_id'

	else {
		query = 'SELECT from_user_id, to_user_id FROM blocked WHERE (from_user_id = $1'

		if (req.query.user_id) {
			query = query.concat(' AND to_user_id = $2) OR (from_user_id = $2 AND to_user_id = $1)')
			parameters.push(req.query.user_id)
		}
		else
			query = query.concat(' OR to_user_id = $1)')
	}

	db.query(query, parameters, (err, res) => {
		if (res)
			resp.status(200).send(res.rows)
		else
			resp.status(500).send(err)
	})
})


blockRouter.delete('/:id', (req, resp) => {

	if (!jwt.verify(req.token, tokenSecret))
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('DELETE FROM blocked WHERE block_id = $1',
		[req.params.id], (err, res) => {
			if (res)
				resp.status(204).end()
			else
				resp.status(500).send(err)
		})
})

module.exports = blockRouter