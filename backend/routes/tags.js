const db = require('../utils/db')
const tagsRouter = require('express').Router()

tagsRouter.get('/', (req, resp) => {
	db.query('SELECT * FROM tags', (err, res) => {
		if (res)
			resp.status(200).send(res.rows)
		else
			resp.status(500).send(err)
	})
})

tagsRouter.post('/', (req, resp) => {
	if (!req.body.tag) {
		return resp.status(400).send({ error: 'tag missing' })
	}

	db.query('INSERT INTO tags (tag) VALUES ($1)', [req.body.tag], (err, res) => {
		if (res)
			resp.status(200).send(req.body.tag)
		else
			resp.status(500).send({ error: err.detail })
	})
})

module.exports = tagsRouter