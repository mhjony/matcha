const   express = require('express')
var     request = require('request')
const   pool = require("./db.js")
var     cors = require('cors')
const   app = express()
const   port = 5000

//middleware
app.use(cors());
app.use(express.json());

//create user
app.post("/users", async(req, res) => {
    try{
        const { name } = req.body;
        const newUser = await pool.query("INSERT INTO users (name) VALUES($1) RETURNING *", [name])
        res.json(newUser.rows[0]);
    }catch(err){
        console.error(err.message)
    }
})
//get all users
app.get("/users", async(req, res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    }catch(err){
        console.error(err.message)
    }
})

//get a user
app.get("/users/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows);
    }catch(err){
        console.log(err.message);
    }
})

// update user
app.put("/users/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;
        const userUpdate = await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, id]);
        res.json("User data updated");
    }catch(err){
        console.log(err.message);
    }
})

// Delete user
app.delete("/users/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const userDel = await pool.query("DELETE FROM users WHERE id=$1", [id]);
        res.json("User deleted");
    }catch(err){
        console.log(err.message);
    }
})

/*
app.get('/', (req, res) => {res.send('Hello World!')})
app.get('/endpoint', (req, res) => {res.send('This is my new end point')})
app.get('/getWeather', (req, res) => {
    request('http://api.weatherstack.com/current?access_key=2443eefcbb9ce34b2b850b1e511d8151&query=New York', function(error, response, body){
        if (!error && response.statusCode === 200){
            var parsedBody = JSON.parse(body);
            var temp = parsedBody['current']['temperature'];
            res.send({ temp })
        }
    })
})
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})