const express = require("express");
const recipeRoute = express()

const {getDetails,getRecipeDetails,addFavorite,favoriteRecipes}= require("../Controller/recipeController");
const Auth = require("../Middleware/Auth");

recipeRoute.get("/getRecipe",getDetails)
recipeRoute.get("/getRecipe/:id",getRecipeDetails)
recipeRoute.post("/addRecipeFav",Auth,addFavorite)
recipeRoute.get("/favoriteRecipes",Auth,favoriteRecipes)



module.exports = recipeRoute;