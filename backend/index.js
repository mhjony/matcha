const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const usersRouter = require('./routers/users')
const tagsRouter = require('./routers/tags')
const loginRouter = require('./routers/login')
const middleware = require('./utils/middleware')
const verifyRouter = require('./routers/verify')
const resetRouter = require('./routers/reset')
const photosRouter = require('./routers/photos')

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(cors())
app.use(middleware.requestLogger)

app.use('/users', usersRouter)
app.use('/tags', tagsRouter)
app.use('/login', loginRouter)
app.use('/verify', verifyRouter)
app.use('/reset', resetRouter)
app.use('/photos', photosRouter)

app.use(middleware.unknownEndpoint)

app.listen(config.PORT, () => {
	console.log(`App running on port ${config.PORT}.`)
})