const { Pool } = require("pg");


require("dotenv").config();

// Connecting with postgresql database with credentials
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database:"recipe"
});
module.exports = pool;
