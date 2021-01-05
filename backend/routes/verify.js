const verifyRouter = require('express').Router()
const db = require('../utils/db')

verifyRouter.get('/', (req, resp) => {
	db.query('UPDATE users SET verified = 1 WHERE token = $1',
		[req.query.token], (err, res) => {
			if (res && res.rowCount === 1) {
				resp.redirect('http://localhost:3000/verify')
			} else {
				resp.redirect('http://localhost:3000')
			}
		})
})

module.exports = verifyRouter