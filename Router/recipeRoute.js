const express = require("express");
const recipeRoute = express()

const {getDetails}= require("../Controller/recipeController")

recipeRoute.get("/getRecipe",getDetails)


module.exports = recipeRoute;