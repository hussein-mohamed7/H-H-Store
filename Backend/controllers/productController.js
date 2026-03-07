const mongoose = require("mongoose");
const {Products} = require("../models/Products");

async function getAll()
{
    return await Products.find({}).lean();
}
async function getByCategory()
{

}
async function getByID(ID)
{
    return await Products.find({_id: new mongoose.Types.ObjectId(ID)});
};

async function deleteByID(ID)
{

}

async function addProduct(product)
{
    product.rating=0;
    return await Products.create(product);
}
const productController={};
productController.getAll = getAll;
productController.getByCategory = getByCategory;
productController.getByID = getByID;
productController.deleteByID = deleteByID;
productController. addProduct =  addProduct;

module.exports = {productController};