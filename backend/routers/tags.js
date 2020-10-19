const db = require('../utils/db')
const tagsRouter = require('express').Router()

tagsRouter.get('/', (req, resp) => {
	db.query('SELECT * FROM tags', (err, res) => {
		if (err)
			resp.status(500).send(err)
		else
			resp.status(200).send(res.rows)
	})
})

tagsRouter.post('/', (req, resp) => {
	if (!req.body.tag) {
		return resp.status(400).send({ error: 'tag missing' })
	}

	db.query('INSERT INTO tags (tag) VALUES ($1)', [req.body.tag], (err, res) => {
		if (err)
			resp.status(500).send({ error: err.detail })
		else
			resp.status(200).send(req.body.tag)
	})
})

module.exports = tagsRouter