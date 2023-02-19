const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, "Keynitin", (err, decode) => {
      if (decode) {
        const userID = decoded.userID;
        console.log(decoded);
        req.body.userID = decoded.userID;
        next();
      } else {
        res.send({ msg: "Please login..." });
      }
    });
  } else {
    res.send({ msg: "Please login..." });
  }
};

module.exports = {
  auth,
};
