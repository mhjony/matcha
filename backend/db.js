const Pool = require("pg").Pool;
const pool = new Pool({
    user: "my_user",
    password: "123456",
    host: "localhost",
    port: "5432",
    database: "matcha"
});

module.exports = pool;