const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema(
    {
        name:{type:String,required:true},
        imageURL:{type:String,required:true},
        category:{type:String,required:true},
        price:{type:Number,required:true},
        rating:{type:Number,required:true},
        gender:{type:String,required:true},
        reviews:[String]
    }
)

const Products = mongoose.model("Products",productSchema);

module.exports={Products};