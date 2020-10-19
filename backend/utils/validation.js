//const Joi = require('@hapi/joi');

const registerValidation = data => {
	/*const schema = Joi.object({
		firstName: Joi.string().min(2).regex(/^([a-zA-Z' ]+)$/).required(),
		lastName: Joi.string().min(2).regex(/^([a-zA-Z' ]+)$/).required(),
		username: Joi.string().min(4).max(20).required(),
		email: Joi.string().required().email(),
		verified: Joi.number().required(),
		token: Joi.string().required(),
		password: Joi.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
		//recieveEmail: Joi.string().min(1).required(),
		gender: Joi.string().min(4).required()
	})
	return schema.validate(data)*/
	console.log(data)
	return true
}

module.exports = { registerValidation }
