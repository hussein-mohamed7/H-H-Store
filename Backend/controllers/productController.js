const mongoose = require("mongoose");
const {Products} = require("../models/Products");

async function getAll()
{
    return await Products.find({}).lean();
}
async function getByPage(pageNum)
{
    return await Products.find({}).skip(pageNum*6).limit(6).lean();
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
    return await Products.deleteOne({_id: new mongoose.Types.ObjectId(ID)});
}

async function addProduct(product)
{
    product.rating=0;
    return await Products.create(product);
}
async function updateProduct(ID,product)
{
    return await Products.updateOne({_id: new mongoose.Types.ObjectId(ID)},{$set:product});
}

module.exports = {getAll,getByCategory,getByPage,getByID,deleteByID,addProduct,updateProduct};