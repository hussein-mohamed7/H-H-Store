require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const argon2 = require("argon2");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const {productController} = require("./controllers/productController")
const {userController} = require("./controllers/userController");
const app = express();

mongoose.connect(process.env.connectionString);
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200'}));
app.get("/users",async (req,res)=>
{
    let results = await userController.getAll();
    res.send(results);
});

app.get("/users/:ID",async(req,res)=>
{
    let results = await userController.getByID(req.params.ID);
    res.send(results);
});

app.post("/login",async(req,res)=>
{
    // Login successful

    // Login unsuccessful
});

app.post("/signup",async (req,res)=>{
    // Check for duplicate email.
    console.log(req.body);
    const email =   (await userController.getByEmail(req.body.email))[0];
    // console.log(email);
    if(email)
    {
        res.send({isDuplicate:true});
    }
    // Signup successful.
    else{
        const hashedPassword = await argon2.hash(req.body.password);
        const user = await userController.addUser({username:req.body.username,password:hashedPassword,email:req.body.email,isAdmin:false,isVerified:false});
        const token = jwt.sign({id:user._id.toString(),username:user.username},process.env.jwtKey);
        console.log(user._id.toString());
        console.log(token);
        res.send({token,isDuplicate:false});
    }
    
});
app.listen(8000);
