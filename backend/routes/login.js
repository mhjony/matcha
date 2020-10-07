const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const pool = require('../db');

router.get('/', async (request, response) => {
    const body = request.body;
    const user = await pool.query("SELECT * FROM users WHERE username= $1", [body.username])
    const hashedPass = user.rows[0].password;;

    const matches = await bcrypt.compare(body.password, hashedPass)
    console.log(matches);
    if (!matches){
        return response.status(401).json({message: "Password is incorrect" });
    }
    const userForToken = {
        username: user.rows[0].username,
        id: user.rows[0]._id,
    }
})

module.exports = router;