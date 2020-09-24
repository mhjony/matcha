const express = require('express');
const pool = require('../db');

const router = express.Router();
const { registerValidation } = require('../validation')

router.post("/", async(req, res) => {
  // LETS VALIDATE THE DATA BEFORE MAKE A USER and it comes from validation.js file
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  // If the user already exists
  pool.query("select email from users where email='"+req.body.email+"'", function(err, data){
    if(data.rows && data.rows.length > 0){
      return res.status(400).send("This email already exists");
    }
  })
    try{
        const { name, username, email, verified, token, password, recieveEmail, gender } = req.body;
        
        const newUser = await pool.query("INSERT INTO users (name, username, email, verified, token, password, recieveEmail, gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
        [name, username, email, verified, token, password, recieveEmail, gender]);    
        
        res.json(newUser.rows);
    }catch(err){
        console.error(err.message)
    }
})

module.exports = router;