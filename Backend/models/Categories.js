const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = Schema(
    {
        name:{type:String,required:true},
        gender:{type:String,required:true},
        imageURL:{type:String}
    }
)

const Categories = mongoose.model("Categories",categorySchema);

module.exports={Categories};