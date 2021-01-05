const router = require('express').Router()
const db = require('../utils/db')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET

router.get('/', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user || (req.query.user_id && user.user_id !== Number(req.query.user_id)))
		return resp.status(401).json({ error: 'token missing or invalid' })

	if (req.query.user_id)
		db.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY date DESC',
			[req.query.user_id], (err, res) => {
				if (res)
					resp.status(200).send(res.rows)
				else
					resp.status(500).send({ error: err.detail })
			})

	else
		db.query('SELECT * FROM notifications ORDER BY date DESC', [], (err, res) => {
			if (res)
				resp.status(200).send(res.rows)
			else
				resp.status(500).send({ error: err.detail })
		})
})

router.post('/', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('INSERT INTO notifications (user_id, from_id, notification) \
	VALUES ($1, $2, $3) RETURNING *',
	[req.body.user_id, req.body.from_id, req.body.notification], (err, res) => {
		if (res)
			resp.status(201).send(res.rows[0])
		else
			resp.status(500).send(err)
	})
})

router.patch('/:id', (req, resp) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('UPDATE notifications SET read = $1 WHERE id = $2 RETURNING *',
		[req.body.read, req.params.id], (err, res) => {
			if (res)
				resp.status(200).send(res.rows[0])
			else
				resp.status(500).send({ error: err.detail })
		})
})

router.patch('/', (req, resp) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('UPDATE notifications SET read = $1 WHERE user_id = $2',
		[req.body.read, user.user_id], (err, res) => {
			if (res)
				resp.status(204).end()
			else
				resp.status(500).send({ error: err.detail })
		})
})

module.exports = router