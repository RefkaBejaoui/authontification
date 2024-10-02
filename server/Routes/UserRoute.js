const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const isAuth = require("../Middlewares/isAuth")

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ msg: "This email exists" });
    } else {
      const newUser = new User({
        userName: userName,
        email: email,
        password: password,
      });
      const saltRounds = 10;
      const cryptedPassword = await bcrypt.hash(password, saltRounds);
      newUser.password = cryptedPassword;
      await newUser.save();
      const payload = {
        id: newUser._id
      };
      const token = await jwt.sign(payload, "oibfninbrpiubn", {
        expiresIn: "24h",
      });
      res.send({ msg: "User created", newUser, token });
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            res.send({msg:"User not found"})
        } else {
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid) {
                res.send({msg:'wrong password'})
            } else {
                const payload = {
                    id: user._id
                }
                const token = await jwt.sign(payload, "oibfninbrpiubn", {
                    expiresIn: "24h"
                })
                res.send({msg:"User connected", user, token})
            }
        }
    } catch (err) {
        console.error(err)    
    }
})

router.get("/isAuth", isAuth, (req, res)=> {
    res.send({user: req.user})
})

module.exports = router;
