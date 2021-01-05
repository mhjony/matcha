const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	req.token = authorization && authorization.toLowerCase().startsWith('bearer ')
		? authorization.substring(7)
		: null
	next()
}

const requestLogger = (req, res, next) => {
	console.log(req.method, req.path)
	console.log(req.body ? req.body: '')
	console.log('---')
	next()
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, response, next) => {

	if (err.name === 'JsonWebTokenError')
		return response.status(401).json({ error: 'Invalid token' })

	next(err)
}


module.exports = {
	requestLogger,
	unknownEndpoint,
	tokenExtractor,
	errorHandler
}