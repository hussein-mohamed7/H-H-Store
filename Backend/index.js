require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const argon2 = require("argon2");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const productController = require("./controllers/productController")
const {userController} = require("./controllers/userController");
const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '202004410@pua.edu.eg',
        pass: process.env.mailPass
    }
});

mongoose.connect(process.env.connectionString);




app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200'}));

// User endpoints
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
        const token = jwt.sign({_id:user._id.toString(),username:user.username},process.env.jwtKey);
        console.log(user._id.toString());
        console.log(token);
        // Create email verification.
        const mailOptions = {
            from: '"Email Authentication" <202004410@pua.edu.eg>', 
            to: 'haz25ayman@gmail.com',
            subject: `${user.username}, verify your email to use your account.`, 
            html: `<a href="http://localhost:4200/verify/${token}">Verify Email</a>` 
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

        res.send({isDuplicate:false});
    }
    
});

app.get("/verify/:Token",async (req,res)=>{
    const Token = req.params.Token;
    if(Token)
    {
        jwt.verify(Token,process.env.jwtKey,async (err,user)=>
        {
            if(err)
            {
                console.log(err);
            }
            console.log(user);
            const result = await userController.verify(user._id);
            // console.log(result);
            res.send({verified:true});
        });
    }
    else
    {
        res.send({verified:false});
    }
    
});


// Product endpoints

app.post("/addProduct",async (req,res)=>
{
    console.log(req.body.product);
    let result = await productController.addProduct(req.body.product);
    res.send({done:true});
});
app.get("/products",async (req,res)=>
{
    const products = await productController.getAll();
    res.send(products);
})
app.get("/products/:page",async(req,res)=>
{
    const products = await productController.getByPage(req.params.page);
    res.send(products);
})
app.get("/product/:ID",async (req,res)=>
{

    const product = await productController.getByID(req.params.ID);
    res.send(product);
});

app.listen(8000);
