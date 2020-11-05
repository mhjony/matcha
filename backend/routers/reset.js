const resetRouter = require('express').Router();
const db = require('../utils/db');
const crypto = require('crypto');
const util = require('../utils/resetEmail')
const bcrypt = require('bcryptjs');

resetRouter.post('/', (req, resp) => {
    db.query('SELECT email from users WHERE email = $1', [req.body.email], (err, res) => {
        if (res && res.rows[0])
        {
            crypto.randomBytes(32, (err, buffer) => {
                if (err)
                    console.log(err)
                const token = buffer.toString("hex")
                db.query('UPDATE users SET token = $1 WHERE email = $2', [token, req.body.email], (err, res) => {
                    if (res)
                    {
                        util.resetEmail(req.body.email, token);
                        resp.status(200).send({ message: "Check your email"})
                    }
                    else
				        resp.status(500).send(err)
                })   
            })
            //resp.status(200).send(res.rows[0])
        }
        else if (res)
            resp.status(401).send({ error: 'No user found with that email'})
        else
            resp.status(500).send({ error: err.detail })
    })
})

resetRouter.post('/new-password', async (req, resp) => {
    token = req.body.token;
    const saltRounts = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounts)
    db.query('SELECT token FROM users WHERE token = $1', [token], (err, res) => {
        if (res && res.rows[0])
        {
            db.query('UPDATE users SET password = $1 WHERE token = $2', [hashedPassword, token], (err, re) => {
                if (re)
                    resp.status(200).send({message: "Password has been changed"})
                else
                    resp.status(500).send(err)
            })
        }
        else if (res)
            resp.status(500).send({ error: "No token found"})
        else
            resp.status(500).send({ error: err.detail})
    })
})

module.exports = resetRouter