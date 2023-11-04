const axios = require("axios");
const pool = require("../db");

module.exports = {
  getDetails: async (req, res) => {
    try {
      await axios
        .get(
          `${process.env.PRODUCTS_BASE_URL}complexSearch?number=30&apiKey=${process.env.API_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          res.send(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          res.status(500).send({ message: "Error while fetching the data!!" });
        });
    } catch (error) {
      console.error(error);
    }
  },
  getRecipeDetails: async (req, res) => {
    try {
      console.log("here");
      const id = req.params.id;
      const resultData = {
        ingredients: "",
        instructions: "",
        nutations: "",
      };
      await axios
        .get(
          `${process.env.PRODUCTS_BASE_URL}informationBulk?ids=${id}&apiKey=${process.env.API_KEY}`
        )
        .then((response) => {
          console.log(response.data, "first");
          if (response.status === 200) {
            resultData.ingredients = response?.data[0]?.extendedIngredients;
            resultData.instructions = response?.data[0]?.instructions;
            setTimeout(async () => {
              await axios
                .get(
                  `${process.env.PRODUCTS_BASE_URL}${id}/nutritionWidget.json?apiKey=${process.env.API_KEY}`
                )
                .then((response) => {
                  if (response.status === 200) {
                    console.log(response.data, "second");
                    resultData.nutations = response?.data?.nutrients;
                    console.log(resultData);
                    res.status(200).send(resultData);
                  }
                })
                .catch(() => {
                  res.status(500).send({ message: "Recipe server not found" });
                });
            }, 2000);
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "Recipe server not found" });
        });
    } catch (error) {
      console.error(error);
    }
  },
  addFavorite: async (req, res) => {
    try {
      const { id, userId } = req.body;
      console.log(typeof id, "body");
      const result = await pool.query(
        "UPDATE users SET recipes = array_append(recipes, $1) WHERE id = $2 RETURNING *",
        [id, userId]
      );
      console.log(result?.rows[0]?.recipes, "jghgj");
      if (result?.rowCount > 0) {
        res.status(200).send({
          recipes: result?.rows[0]?.recipes,
          message: "Recipe added successfully",
        });
      } else {
        res
          .status(403)
          .send({ message: "Something error while adding recipe !" });
      }
    } catch (error) {
      console.error(error);
    }
  },
  favoriteRecipes: async (req, res) => {
    try {
      const { id, userId } = req.query;
      let obj = {
        title: "",
        image: "",
      };
      const userData = await pool.query("SELECT * FROM users WHERE id = $1", [
        userId,
      ]);
      if (userData.rows.length < 0) {
        res.status(401).send({ message: "You are not a authorized user" });
      } else {
        const resultArray = [];
        await axios
          .get(
            `${process.env.PRODUCTS_BASE_URL}informationBulk?ids=${id}&apiKey=${process.env.API_KEY}`
          )
          .then((response) => {
            console.log(response,"response")
            for (let i = 0; i < response?.data.length; i++) {
              obj = {
                title: response?.data[i]?.title,
                image: response?.data[i]?.image,
              };
              resultArray.push(obj);
            }
            res.status(200).send({message:"success",resultArray})
          }).catch(err=>{
            res.status(403).send({message:"Error while fetching data"})
          })
      }
    } catch (error) {
      console.error(error);
    }
  },
};
