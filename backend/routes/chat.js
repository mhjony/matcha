const db = require('../utils/db')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET

router.get('/', (req, resp) => {

	const user = jwt.verify(req.token, tokenSecret)

	if (!user)
		return resp.status(401).json({ error: 'token missing or invalid' })

	db.query(`SELECT * FROM chat
	WHERE sender=$1 OR receiver=$1
	ORDER BY date ASC`, [user.user_id], (err, res) => {
		if (res)
			resp.status(200).send(res.rows)
		else
			resp.status(500).send({ error: err.detail })
	})
})

module.exports = router