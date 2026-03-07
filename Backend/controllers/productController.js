const {Products} = require("../models/Products");

async function getAll()
{

}
async function getByCategory()
{

}
async function getByID(ID)
{

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