const photosRouter = require('express').Router()
const db = require('../utils/db')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET

photosRouter.post('/', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('INSERT INTO photos (user_id, profile_pic, photo_str) \
	VALUES ($1, $2, $3) RETURNING id',
	[user.user_id, req.body.profilePic, req.body.photoStr],
	(err, res) => {
		if (res)
			resp.status(200).send(res.rows[0])
		else
			resp.status(500).send(err)
	})
})

photosRouter.delete('/:id', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('DELETE FROM photos WHERE id = $1',
		[req.params.id], (err, res) => {
			if (res)
				resp.status(204).end()
			else
				resp.status(500).send(err)
		})
})

photosRouter.put('/:id', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query('UPDATE photos SET profile_pic = $1 WHERE id = $2',
		[req.body.profilePic, req.params.id], (err, res) => {
			if (res)
				resp.status(200).send(res.rows[0])
			else
				resp.status(500).send(err)
		})
})

module.exports = photosRouter