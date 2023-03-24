const Pool = require("pg").Pool

const pool = new Pool({
    user: "daniel_h",
    host: "localhost",
    port: 5432,
    database: "jwttutorial"
});

module.exports = pool;