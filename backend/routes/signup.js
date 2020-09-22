const express = require('express');
const pool = require('../db');

const router = express.Router();

//VALIDATION
const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  username: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  verified: Joi.string().min(1).required(),
  token: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  recieveEmail: Joi.string().min(1).required(),
  gender: Joi.string().min(4).required()
})

router.post("/", async(req, res) => {
  // LETS VALIDATE THE DATA BEFORE MAKE A USER
  const { error } = schema.validate(req.body);
  res.send(error.details[0].message);


    // try{
    // const { name, username, email, verified, token, password, recieveEmail, gender } = req.body;
		
		// const newUser = await pool.query("INSERT INTO users (name, username, email, verified, token, password, recieveEmail, gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
    // [name, username, email, verified, token, password, recieveEmail, gender]);    
		// res.json(newUser.rows);
    // }catch(err){
    //     console.error(err.message)
    // }
})

module.exports = router;