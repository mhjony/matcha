const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../utils/db')
const tokenSecret = require('../utils/config').TOKEN_SECRET
const { getLoginCoordinates } = require('../utils/getLoginCoordinates')

loginRouter.post('/', (request, response) => {
	const body = request.body

	db.query('SELECT verified, password FROM users WHERE username = $1',
		[body.username], async (err, res) => {

			if (err)
				return response.status(500).send({ error: 'Database error' })

			if (res.rowCount === 0)
				return response.status(401).send({ error: 'Invalid username or password' })

			const hashedPass = res.rows[0].password
			const passwordMatches = await bcrypt.compare(body.password, hashedPass)

			if (!passwordMatches)
				return response.status(401).send({ error: 'Invalid username or password' })

			if (!res.rows[0].verified)
				return response.status(401).send({ error: 'Account needs to be verified, check your email' })

			const coords = await getLoginCoordinates(request)

			db.query('WITH updated AS (\
				UPDATE users\
				SET (latitude, longitude) = ($1, $2)\
				WHERE username = $3\
				RETURNING user_id, first_name, last_name, username, email,\
				gender, orientation, bio, tags, AGE(birthdate) as age,\
				longitude, latitude)\
				SELECT updated.*, photos.id, photos.photo_str, photos.profile_pic FROM updated\
				LEFT OUTER JOIN photos USING (user_id)',
			[coords.latitude, coords.longitude, body.username], (err, result) => {
				if (result) {

					// eslint-disable-next-line no-unused-vars
					const { id, photo_str, profile_pic, first_name, last_name, age, ...user } = result.rows[0]

					const userForToken = {
						username: result.rows[0].username,
						user_id: result.rows[0].user_id,
					}

					const sessionToken = jwt.sign(userForToken, tokenSecret)

					return response
						.status(200)
						.send({
							photos: photo_str
								? result.rows.map(r => ({
									id: r.id,
									photoStr: r.photo_str,
									profilePic: r.profile_pic
								}))
								: [],
							sessionToken,
							firstName: first_name,
							lastName: last_name,
							age: age.years,
							...user,
						})
				}

				return response.status(500).send({ error: 'Database error' })

			})

		})
})

module.exports = loginRouter