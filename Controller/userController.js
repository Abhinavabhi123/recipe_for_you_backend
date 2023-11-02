const pool = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = process.env.USER_JWT_SECRET;

module.exports = {
  userLogin: async (req, res) => {
    try {
      const { name, email, image } = req.body;
      console.log(req.body);
      const existingRecord = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      console.log(existingRecord);
      if (existingRecord.rows.length > 0) {
        const jwtToken = jwt.sign(
          {
            _id: existingRecord?.rows[0]?.id,
            name:existingRecord?.rows[0]?.name,
            email: existingRecord?.rows[0]?.email,
            image: existingRecord?.rows[0]?.image,
          },
          secretKey,
          { expiresIn: "15d" }
        );
        return res
          .status(200)
          .send({ userDta: existingRecord.rows, message: "Login success",jwtToken });
        //   .cookie("user", jwtToken, {
        //     expires: new Date(Date.now() + 3600 * 1000),
        //     httpOnly: false,
        //     sameSite: "strict",
        //   })
      } else {
        const result = await pool.query(
          "INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING *",
          [name, email, image]
        );
        const jwtToken = jwt.sign(
          {
            _id: result?.rows[0]?.id,
            name: result?.rows[0]?.name,
            email: result?.rows[0]?.email,
            image: result?.rows[0]?.image,
          },
          secretKey,
          { expiresIn: "15d" }
        );
        res
          .status(200)
          .send({ userData: result.rows, message: "Login success",jwtToken});
        //   .cookie("user", jwtToken, {
        //     expires: new Date(Date.now() + 3600 * 1000),
        //     httpOnly: false,
        //     sameSite: "strict",
        //   })
      }
    } catch (error) {
      console.error(error);
    }
  },
};
