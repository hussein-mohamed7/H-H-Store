const {Users} = require("../models/Users");

async function getAll()
{
    return await Users.find({}).lean();
}
async function getByCategory()
{

}
async function getByID(ID)
{
    console.log(ID);
    return await Users.find({_id:ID}).lean();
};

async function deleteByID(ID)
{

}
const userController={};
userController.getAll = getAll;
userController.getByCategory = getByCategory;
userController.getByID = getByID;
userController.deleteByID = deleteByID;

module.exports = {userController};