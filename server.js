const express = require("express");
const cookieParser = require("cookie-parser")
const morgan = require("morgan");
const cors = require("cors")
const app = express();

const recipeRoute = require("./Router/recipeRoute")
const userRoute = require('./Router/userRoute')
const pool = require('./db')

// configuring dotenv
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(morgan('dev'))

// connecting postgresql database
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:..', err);
  } else {
    console.log('Connected to PostgreSQL database...');
  }
});

// CORS Configuration
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  methods:process.env.CORS_METHODS,
  credentials:true,
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// Routes
app.use("/recipe",recipeRoute)
app.use("/user",userRoute)

// Start the server
app.listen(process.env.PORT || 4000, () =>
  console.log(`server is running in Port ${process.env.PORT}...`)
);
