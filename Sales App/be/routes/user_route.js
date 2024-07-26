const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModelSales = mongoose.model("userModelSales");
const saleModel = require('../models/sale_model');
const {JWT_SECRET} = require('../config');
const protectedRoute = require("../middleware/protectedResource");

//api for signup page
router.post("/signup", (req,res)=>{
    console.log("signup page touched");
    //getting the values from the form
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
        res.status(400).json({error: "One or more  mandatory fields missing"});
    }
    userModelSales.findOne({email : email})
    .then((userInDb)=>{ //userInDb - this will give the details of the user if he exists in the datbase with that email. finOne() method will return those details.
        if(userInDb){
            console.log("user already exists");
            return res.status(500).json({error: "user with this email already exists"});
        }
        bcryptjs.hash(password, 16)
        .then((hashedPassword)=>{ //this is the encrypted password
            const user = new userModelSales({firstName, lastName, email, password: hashedPassword});
            user.save()
            .then(()=>{
                res.status(201).json({result: "User signed up successfully"});
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    })
    .catch((err)=>{
        console.log(err);
    })
});


//api for user login 
router.post("/login", (req,res)=>{
    console.log("login page touched");
    //getting the values from the form
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({error: "One or more  mandatory fields missing"});
    }
    userModelSales.findOne({email : email})
    .then((userInDb)=>{ //userInDb - this will give the details of the user if he exists in the datbase with that email. finOne() method will return those details.
        if(!userInDb){
            res.status(500).json({error: "user does not exist"});
        }
        bcryptjs.compare(password, userInDb.password)
        .then((passwordMatch)=>{ //this is the encrypted password
            if(passwordMatch){
                const jwttoken = jwt.sign({_id: userInDb._id}, JWT_SECRET);
                const userInfo = { "email": userInDb.email, "firstName": userInDb.firstName }
                res.status(200).json({result: {token: jwttoken, user: userInfo}});
            }else{
                res.status(401).json({error: "invalid credentials"});
            }
        })
        .catch((err)=>{
            console.log(err);
        })

    })
    .catch((err)=>{
        console.log(err);
    })
});

router.post("/addsale", protectedRoute, (req, res)=>{
    console.log("adding sales ");
    const {productName, quantity, amount} = req.body;
    if(!productName || !quantity || !amount){
        res.status(400).json({error: "One or more  mandatory fields missing"});
    }
    const sale = new saleModel({productName, quantity, amount});
    sale.save()
    .then(()=>{
        res.status(200).json({result: "sale added to db"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

// router.get("/getsales", protectedRoute, (req, res)=>{
//     console.log("getting sales ");
//     saleModel.find()
//     .then((dbSales)=>{
//         console.log(dbSales);
//         res.status(200).json({sales: dbSales});
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })


//this will print all the sales

// router.get("/getsales", protectedRoute, (req, res) => {
//     console.log("Getting sales");
//     saleModel.find()
//         .then((dbSales) => {
//             const salesWithConvertedAmounts = dbSales.map(sale => {
//                 const saleObject = sale.toObject();
//                 saleObject.amount = parseFloat(sale.amount.toString());
//                 return saleObject;
//             });
//             res.status(200).json({ sales: salesWithConvertedAmounts });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: "An error occurred while fetching sales." });
//         });
// });

//to print top 5 sales i used aggregate function
router.get("/getsales", protectedRoute, (req, res) => {
    console.log("Getting top 5 sales");
    saleModel.aggregate([
        { $sort: { amount: -1 } }, // Sort by amount in descending order
        { $limit: 5 } // Limit the result to 5
    ])
    .then((dbSales) => {
        const top5Sales = dbSales.map(sale => {
            sale.amount = parseFloat(sale.amount.toString());
            return sale;
        });
        res.status(200).json({ sales: top5Sales });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error occurred while fetching sales." });
    });
});



router.get("/totalrevenue", protectedRoute, (req, res) => {
    console.log("calculating total revenue");
    saleModel.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
            }
        }
    ])
    .then((result) => {
        const totalAmount = result[0]?.totalAmount || 0;
        console.log("Total Revenue:", totalAmount);
        res.status(200).json({ totalRevenue: totalAmount });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;