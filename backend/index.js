const config = require('./utils/config')
const app = require('./app')

const server = app.listen(config.PORT, () => {
	console.log(`App running on port ${config.PORT}.`)
})

require('./socket')(server)
