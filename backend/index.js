const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const userRouter = require('./routes/signup');
const emailVerifyRouter = require('./routes/emailVerification');
const loginRouter = require('./routes/login');
const userHomeRouter = require('./routes/userHome');

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(cors());
app.use(express.json());

//create users
app.use('/signup', userRouter);
app.use('/verify', emailVerifyRouter);
app.use('/login', loginRouter);
app.use('/posts', userHomeRouter);

app.listen(5000, () => {
	console.log("server started on port 5000");
})