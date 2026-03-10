require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const argon2 = require("argon2");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const productController = require("./controllers/productController")
const {userController} = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const cartController = require("./controllers/cartController");
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
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200',credentials:true}));

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
    
    let user = (await userController.getByEmail(req.body.email))[0];
    console.log(user);
    if(user?.email)
    {
        if(!user?.isVerified)
        {
            res.send({success:false,code:1});
        }
        else if(await argon2.verify(user.password,req.body.password))
        {
            // Login successful
            const token = jwt.sign({_id:user._id,username:user.username,isAdmin:user.isAdmin},process.env.jwtKey);
            res.cookie("authToken", token,{secure:false,httpOnly:true});
            return res.send({success:true});
        }
        else // Login unsuccessful
        {
            return res.send({success:false,code:4});
        }
    }
    else // Login unsuccessful
    {
        return res.send({success:false,code:4});
    }
    
});

app.post("/signup",async (req,res)=>{
    // Check for duplicate email.
    // console.log(req.body);
    const email =  (await userController.getByEmail(req.body.email))[0];
    // console.log(email);
    if(email)
    {
        res.send({isDuplicate:true});
    }
    // Signup successful.
    else{
        const hashedPassword = await argon2.hash(req.body.password);
        const user = await userController.addUser({username:req.body.username,password:hashedPassword,email:req.body.email,isAdmin:false,isVerified:false,path:'/'});
        const token = jwt.sign({_id:user._id.toString(),username:user.username},process.env.jwtKey);
        // console.log(user._id.toString());
        // console.log(token);
        // Create email verification.
        const mailOptions = {
            from: '"Email Authentication" <202004410@pua.edu.eg>', 
            to: user.email,
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

app.get("/verify-email/:Token",async (req,res)=>{
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
app.get("/verify-token",async (req,res)=>
{
    if(req.cookies.authToken)
    {
        // console.log(req.cookies.authToken);
        let user = jwt.verify(req.cookies.authToken,process.env.jwtKey);
        let verification = (await userController.getByID(user._id))[0];
        console.log(verification);
        if(verification._id)
        {
            console.log("verified id")
            console.log(user);
            if(user.isAdmin)
            {
                if(user.isAdmin==verification.isAdmin)
                {
                    res.send({verified:true});
                }
                else
                {
                    res.send({verified:false});
                }
            }
            else
            {  
                console.log("user is verified");
                res.send({verified:true});
            }
                
        }
        else
        {
            res.send({verified:false});
        }
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
    for(let product of req.body.products)
    {
        let result = await productController.addProduct(product);
    }
    
    res.send({done:true});
});
app.get("/products",async (req,res)=>
{
    const products = await productController.getAll();
    res.send(products);
})
app.post("/products",async(req,res)=>
{
    const products = await productController.getByPage(req.body.page,req.body.query);
    res.send(products);
})
app.post("/products-by-category",async (req,res)=>
{
    const products = await productController.getByCategory(req.body.page,req.body.category,req.body.gender);
    res.send(products);
});
app.get("/product/:ID",async (req,res)=>
{

    const product = await productController.getByID(req.params.ID);
    res.send(product);
});


app.delete("/product/:ID",async (req,res)=>{
    const deleteResult = await productController.deleteByID(req.params.ID);
    res.send(deleteResult);
});

app.put("/update/product/:ID",async (req,res)=>{
    const updateResult = await productController.updateProduct(req.params.ID,req.body.product);
    res.send(updateResult);
    console.log(req.params.ID);
});




// Categories

app.get("/categories",async (req,res)=>
{
    const categories = await categoryController.getAll();
    res.send(categories);
})

app.post("/categories",async (req,res)=>
{
    for(let category of req.body.categories)
    {
        await categoryController.add(category);
    }
    
    res.send({done:true});
})



// for cart
function getUserFromRequest(req) {
    if(!req.cookies.authToken) return null;
    try {
        return jwt.verify(req.cookies.authToken, process.env.jwtKey);
    } catch(err) {
        return null;
    }
}


app.post("/cart/:id", async (req, res) => {
    const user = getUserFromRequest(req);
    if(!user) return res.status(401).send({ error: "Not logged in" });

    const productId = req.params.id;
    try {
        const result = await cartController.addToCart(user._id, productId);
        res.send(result);
    } catch(err) {
        res.status(500).send({ error: "Failed to add to cart", details: err.message });
    }
});


app.get("/cart", async (req, res) => {
    const user = getUserFromRequest(req);
    if(!user) return res.status(401).send({ error: "Not logged in" });

    try {
        const cart = await cartController.getCart(user._id);
        res.send(cart);
    } catch(err) {
        res.status(500).send({ error: "Failed to get cart", details: err.message });
    }
});


app.delete("/cart/:id", async (req, res) => {
    const user = getUserFromRequest(req);
    if(!user) return res.status(401).send({ error: "Not logged in" });

    const productId = req.params.id;
    try {
        const result = await cartController.removeFromCart(user._id, productId);
        res.send(result);
    } catch(err) {
        res.status(500).send({ error: "Failed to remove from cart", details: err.message });
    }
});

app.listen(8000);
