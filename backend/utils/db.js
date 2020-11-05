const config = require('./config')
const Pool = require('pg').Pool

const pool = new Pool({
	user: config.PG_USER,
	host: config.PG_HOST,
	database: config.PG_DB,
	password: config.PG_PW,
	port: config.PG_PORT,
})

module.exports = {
	query: (text, params, callback) => {
		const start = Date.now()
		return pool.query(text, params, (err, res) => {
		  const duration = Date.now() - start
		  if (res)
			  console.log('postgres query', { text, duration, rows: res.rowCount })
		  callback(err, res)
		})
	},
}