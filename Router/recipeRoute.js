const express = require("express");
const recipeRoute = express()

const {getDetails,getRecipeDetails}= require("../Controller/recipeController")

recipeRoute.get("/getRecipe",getDetails)
recipeRoute.get("/getRecipe/:id",getRecipeDetails)


module.exports = recipeRoute;