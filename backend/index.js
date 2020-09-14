const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const userRouter = require('./routes/users');


app.use(cors());
app.use(express.json());

//create users
app.use('/users', userRouter);


app.listen(5000, () => {
	console.log("server started on port 5000");
})