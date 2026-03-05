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
async function getByEmail(Email)
{
    console.log(Email);
    return await Users.find({email:Email},{email:1}).lean();
}
async function deleteByID(ID)
{

}
async function addUser(user)
{
    // console.log(user);
    return await Users.create(user);
}
async function verify(ID)
{

}
const userController={};
userController.getAll = getAll;
userController.getByCategory = getByCategory;
userController.getByID = getByID;
userController.addUser = addUser;
userController.deleteByID = deleteByID;
userController.getByEmail = getByEmail;
module.exports = {userController};