/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT
const PG_USER = process.env.PG_USER
const PG_HOST = process.env.PG_HOST
const PG_DB = process.env.PG_DB
const PG_PW = process.env.PG_PW
const PG_PORT = process.env.PG_PORT
const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = {
	PORT,
	PG_USER,
	PG_HOST,
	PG_DB,
	PG_PW,
	PG_PORT,
	TOKEN_SECRET
}