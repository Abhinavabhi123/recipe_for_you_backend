const axios  = require('axios')

module.exports = {
  getDetails: (req, res) => {
    try {
      axios
        .get(`${process.env.PRODUCTS_BASE_URL}?apiKey=${process.env.API_KEY}`)
        .then((response) => {
          console.log(response.data);
          res.send(response.data)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  },
};
