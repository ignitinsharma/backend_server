const express = require("express");
const { userModel } = require("../Model/users.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// user Register
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    /* 
    --> encrypted password 5 means how many time you want to encrypted the things
    
    --> hash means that password gonna convet in somw letter and stored into that hash
    */

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send(`Something went wrong ${err}`);
      } else {
        /* 
        --> here we are sending the details and instead of password we
        are sending that encrypted hash password...

        in DB that password look like this 
        password: "$2b$05$JIJhOWGI2l2wAhUkSx1O7uqPxX.g3lwDgvDbrIciAc4TcQBUDob52"
        */
        const user = await new userModel({ name, email, password: hash });
        user.save();
        res.send("Register user successfully");
      }
    });
  } catch (err) {
    res.send(`Something went wrong ${err}`);
  }
});

// user login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    console.log("user:", user);
    if (user.length > 0) {
      /* 
      --> Here we are comparing that user password is same or not
          if same then we decrypt that password and logged in user...

          user[0].password 
          it means when we check user is present or not by using mail then we got if user 
          present user data in the form of array so we are accessing user hash password doing this...
      */

      bcrypt.compare(password, user[0].password, (err, decrypt_password) => {
        if (decrypt_password) res.send(`Something went wrong ${err}`);
        else {
          /* 
          --> if Hash password is matching with DB password so we genrate the Token 
          */
          const token = jwt.sign({ userid: user[0]._id }, "Keynitin");
          res.send({ message: "User logged in...", token: token });
        }
      });
    } else {
      /* 
  --> If user is not present so that catch method gonna excute
    */
      res.send("wrong Credentials");
    }
  } catch (err) {
    /* 
    --> If statement having error so this catch excute
    */
    res.send(`Something went wrong ${err}`);
  }
});

module.exports = {
  userRouter,
};
