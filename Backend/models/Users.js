const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema(
    {
        username:String,
        password:String,
        email:String,
        isAdmin:Boolean,
        isVerified:Boolean,
    }
)

const Users = mongoose.model("Users",userSchema);

module.exports={Users};