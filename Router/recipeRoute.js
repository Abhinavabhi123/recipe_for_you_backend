const express = require("express");
const recipeRoute = express()
const userController = require('../Controller/userController');
const recipeController = require("../Controller/recipeController")

recipeRoute.get("/getRecipe",recipeController.getDetails)


module.exports = recipeRoute;