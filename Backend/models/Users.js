const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema(
    {
        _id:Schema.Types.ObjectId,
        userName:String,
        password:String,
        email:String,
        isAdmin:Boolean
    }
)

const Users = mongoose.model("Users",userSchema);

module.exports={Users};