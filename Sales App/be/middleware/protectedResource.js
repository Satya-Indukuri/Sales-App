const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config');
const mongoose = require("mongoose");
const userModelSales = mongoose.model("userModelSales");

module.exports = (req, res, next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({error: "User not logged in"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (error, payload)=>{
        if(error){
            res.status(401).json({error: "User not logged in"});
        }
        const {_id} = payload;
        userModelSales.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next();
        })
        .catch((err)=>{
            console.log(error);
        })
    })
}