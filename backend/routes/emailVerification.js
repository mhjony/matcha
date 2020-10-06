const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get("/", async(req, res) => {
  verified = 1;

  const verifyUser = await pool.query("UPDATE users SET verified = $1 WHERE token = $2", [verified, req.query.token])
  res.redirect('http://localhost:3000');
})

 module.exports = router;