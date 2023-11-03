const express = require("express");
const recipeRoute = express()

const {getDetails,getRecipeDetails,addFavorite}= require("../Controller/recipeController");
const Auth = require("../Middleware/Auth");

recipeRoute.get("/getRecipe",getDetails)
recipeRoute.get("/getRecipe/:id",getRecipeDetails)
recipeRoute.post("/addRecipeFav",Auth,addFavorite)


module.exports = recipeRoute;