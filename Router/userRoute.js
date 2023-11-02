const express = require("express");
const userRoute = express()
const {userLogin}  = require("../Controller/userController")

userRoute.post("/userLogin",userLogin)

module.exports = userRoute;