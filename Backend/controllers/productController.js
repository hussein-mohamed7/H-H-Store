const mongoose = require("mongoose");
const {Products} = require("../models/Products");

async function getAll()
{
    return await Products.find({}).lean();
}
async function getByPage(page,query,minPrice=0,maxPrice=5000)
{
    let filter={};
    if(query!="")
    {
        filter.name={$regex:".*"+query+".*",$options:"i"};
    }
    filter.price={$gte:Number(minPrice),$lte:Number(maxPrice)};
    const products= await Products.find(filter).skip(page*6).limit(6).lean();
    const count = await Products.countDocuments(filter);
    return {products,count}
}

async function getByCategory(page,category,gender,minPrice=0,maxPrice=5000)
{
    let filter={};
    if(category!="")
    {
        filter.category=category;
    }
    if(gender!="")
    {
        filter.gender=gender;
    }
    filter.price={$gte:Number(minPrice),$lte:Number(maxPrice)};
    console.log(filter);

    const products= await Products.find(filter).skip(page*6).limit(6).lean();
    const count = await Products.countDocuments(filter);
    return {products,count}
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