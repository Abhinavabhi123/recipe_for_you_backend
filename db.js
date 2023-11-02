const { Pool } = require("pg");
// const fs = require("fs");

require("dotenv").config();

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database:"recipe"
});

// async function createDatabase() {
//   const client = await pool.connect();
//   try {
//     // Check if the database 'recipe' already exists
//     const databaseExistsQuery =
//       "SELECT 1 FROM pg_database WHERE datname = 'recipe'";
//     const result = await client.query(databaseExistsQuery);
//     if (result.rows.length === 0) {
//       // If the database doesn't exist, create it
//       await client.query("CREATE DATABASE recipe");
//       console.log("Database 'recipe' created successfully.");
//       client.release();
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     client.release();
//   }
// }
// const createSchema = () => {
//   const sql = fs.readFileSync("database.sql", "utf8");
//   // Check if the "votes" table exists
//   pool.query("SELECT to_regclass($$public.votes$$)", (err, result) => {
//     if (err) {
//       console.error("Error checking for table existence:", err);
//     } else {
//       if (!result.rows[0].to_regclass) {
//         // Table doesn't exist, so create it
//         pool.query(sql, (err, result) => {
//           if (err) {
//             console.error("Error creating table:", err);
//           } else {
//             console.log("Table schema created successfully.");
//           }
//         });
//       } 
//     }
//   });
// };
// createSchema();

// createDatabase();
module.exports = pool;
