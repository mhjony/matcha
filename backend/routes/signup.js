const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');

const router = express.Router();
const { registerValidation } = require('../validation')
const { sendEmail } = require('./sendEmail')

router.post("/", async(req, res) => {
  // LETS VALIDATE THE DATA BEFORE MAKE A USER and it comes from validation.js file
    const { error } = registerValidation(req.body);
    if (error) return res.send({ message: error.details[0].message});

  // If the email already exists
  const emailExist = await pool.query("SELECT email FROM users WHERE email= $1", [req.body.email])
    if (emailExist.rows.length > 0) {
      // return res.status(400).json({message: "This email already exists"});
      return res.send({ message: "This email already exists" });
    }

  // If the username already exists
  const usernameExist = await pool.query("SELECT username FROM users WHERE username= $1", [req.body.username])
    if (usernameExist.rows.length > 0) {
      //return res.status(400).json({message: "This username already exists"});
      return res.send({ message: "This username already exists" });
    }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try{
      const { firstName, lastName,  username, email, verified, token, gender } = req.body;        
      const newUser = await pool.query("INSERT INTO users (first_name, last_name, username, email, verified, token, password, gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
      [firstName, lastName, username, email, verified, token, hashedPassword, gender]);

      sendEmail(req.body.email, req.body.token);
      //const { error } = sendEmail(req.body.email);
      /*
      if (!error){
        return res.status(400).json({message: "Email could not be sent"});
      }
      */
      return res.send({ message: "An email has been sent to your email" });
      //res.json(newUser.rows);
  }catch(err){
      console.error(err.message)
  }
})

module.exports = router;