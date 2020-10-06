const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const userRouter = require('./routes/signup');
const emailVerify = require('./routes/emailVerification');

app.use(cors());
app.use(express.json());

//create users
app.use('/signup', userRouter);
app.use('/verify', emailVerify);

app.listen(5000, () => {
	console.log("server started on port 5000");
})