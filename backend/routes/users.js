const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post("/", async(req, res) => {
    try{
    const { name, username, email, verified, token, password, recieveEmail } = req.body;
    // const { name, username, email } = req.body;
		
		const newUser = await pool.query("INSERT INTO users (name, username, email, verified, token, password, recieveEmail) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
    [name, username, email, verified, token, password, recieveEmail]);
    // const newUser = await pool.query("INSERT INTO users_check (name, email) VALUES($1, $2) RETURNING *", [name, email]);
    
		res.json(newUser.rows);
    }catch(err){
        console.error(err.message)
    }
})

module.exports = router;