const mongoose = require("mongoose")
const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")

const isAuth = async (req, res, next) => {
    const token = req.headers["autorisation"]
    if(!token) {
        res.send({msg:"no token"})
    } else {
        const decoded = await jwt.verify(token, "oibfninbrpiubn")
        const user = await User.findById(decoded.id)
        if(user) {
            req.user = user
            next()
        }
    }
}

module.exports = isAuth;