const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const routes = require('./routes')
const app = express()

app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.enable('trust proxy')

Object.keys(routes).forEach(k => {
	app.use(`/${k}`, routes[k])
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
