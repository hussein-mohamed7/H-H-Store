const mongoose = require("mongoose");
const {Users} = require("../models/Users");

async function getAll()
{
    return await Users.find({}).lean();
}
async function getAllForAdmin(ID)
{
    return await Users.find({$and:[{isAdmin:false},{_id:{$ne:new mongoose.Types.ObjectId(ID)}}]}).lean();
}
async function getByID(ID)
{
    console.log(ID);
    return await Users.find({_id:new mongoose.Types.ObjectId(ID)}).lean();
};
async function getByEmail(Email)
{
    console.log(Email);
    return await Users.find({email:Email}).lean();
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
    console.log(ID);
    return await Users.updateOne({_id:new mongoose.Types.ObjectId(ID)},{$set:{isVerified:true}});
}
const userController={};
userController.getAll = getAll;
userController.getAllForAdmin = getAllForAdmin;
userController.getByID = getByID;
userController.addUser = addUser;
userController.deleteByID = deleteByID;
userController.getByEmail = getByEmail;
userController.verify = verify;
module.exports = {userController};