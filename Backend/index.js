require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const {productController} = require("./controllers/productController")
const {userController} = require("./controllers/userController");
const app = express();

mongoose.connect(process.env.connectionString);
app.use(bodyParser.json());

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

app.listen(8000);
