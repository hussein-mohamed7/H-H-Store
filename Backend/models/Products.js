const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema(
    {
        _id:Schema.Types.ObjectId,
        productName:String,
        imageURL:String,
        category:String,
        price:Number,
        rating:Number
    }
)

const Products = mongoose.model("Products",productSchema);

module.exports={Products};