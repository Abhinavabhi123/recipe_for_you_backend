const axios = require("axios");

module.exports = {
  getDetails: async (req, res) => {
    try {
     await axios
        .get(`${process.env.PRODUCTS_BASE_URL}complexSearch?number=30&apiKey=${process.env.API_KEY}`)
        .then((response) => {
          console.log(response.data);
          res.send(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          res.status(500).send({message:"Error while fetching the data!!"})
        });
    } catch (error) {
      console.error(error);
    }
  },
  getRecipeDetails: async (req, res) => {
    try {
      console.log("here");
      const id = req.params.id;
      const resultData ={
        ingredients:"",
        instructions:"",
        nutations:""
      }
     await axios
        .get(
          `${process.env.PRODUCTS_BASE_URL}informationBulk?ids=${id}&apiKey=${process.env.API_KEY}`
        )
        .then((response) => {
          console.log(response.data,"first");
          if(response.status===200){
            resultData.ingredients=response?.data[0]?.extendedIngredients;
            resultData.instructions = response?.data[0]?.instructions
            setTimeout(async()=>{

              await axios.get(`${process.env.PRODUCTS_BASE_URL}${id}/nutritionWidget.json?apiKey=${process.env.API_KEY}`).then((response)=>{
                if(response.status===200){
                  console.log(response.data,"second");
                  resultData.nutations = response?.data?.nutrients
                  console.log(resultData);
                  res.status(200).send(resultData)
                }
              }).catch(()=>{
                res.status(500).send({message:'Recipe server not found'})
              })
              
            },2000)
          }
        }).catch(err=>{
          res.status(500).send({message:'Recipe server not found'})
        })
    } catch (error) {
      console.error(error);
    }
  },
};
