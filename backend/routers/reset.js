const resetRouter = require('express').Router();
const db = require('../utils/db')

resetRouter.post('/', (req, resp) => {
    db.query('SELECT email from users WHERE email = $1', [req.body.email], (err, res) => {
        if (res && res.rows[0])
        {
            resp.status(200).send(res.rows[0])
        }
        else if (res)
            resp.status(500).send({ error: 'No user found with that email'})
        else
            resp.status(500).send({ error: err.detail })
    })
})

module.exports = resetRouter