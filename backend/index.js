const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const userRouter = require('./routes/signup');


app.use(cors());
app.use(express.json());

//create users
app.use('/signup', userRouter);


app.listen(5000, () => {
	console.log("server started on port 5000");
})