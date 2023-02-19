const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "keyNitin");
    if (decoded) {
      const userID = decoded.userID;
      console.log(decoded);
      req.body.userID = userID;
      next();
    } else {
      res.send({ msg: "Please login first" });
    }
  } else {
    res.send({ msg: "Please login first" });
  }
};

module.exports = {
  authenticate,
};
