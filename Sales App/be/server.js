const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const {MONGODB_URL} = require('./config.js');

//CONNECTING TO MONGOOSE
mongoose.connect(MONGODB_URL);
//TESTING CONNECTION
mongoose.connection.on('connected', ()=>{
    console.log("DB connection successful");
})
mongoose.connection.on("error",(error)=>{
    console.log("error while connecting to database  ", error);
})

require('./models/user_model.js')

app.use(cors());
app.use(express.json());

app.use(require('./routes/user_route.js'));

app.listen(4000,()=>{
    console.log("server started at 4000...");
})