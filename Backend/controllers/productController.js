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
const productController={};
productController.getAll = getAll;
productController.getByCategory = getByCategory;
productController.getByID = getByID;
productController.deleteByID = deleteByID;

module.exports = {productController};