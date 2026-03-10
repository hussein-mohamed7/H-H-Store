const {Cart} = require("../models/Cart");
const {Products} = require("../models/Products");

async function addToCart(userId, productId) {
    const product = await Products.findById(productId);

    if(!product) throw new Error("Product not found");

    if(product.quantity <= 0) {
        throw new Error("Product out of stock");
    }

    // نقص الكمية في Products
    product.quantity -= 1;
    await product.save();

    // إضافة للكارت
    const item = await Cart.findOne({userId, productId});
    if(item){
        item.quantity += 1;
        return await item.save();
    } else {
        return await Cart.create({userId, productId, quantity:1});
    }
}


async function getCart(userId) {
    return await Cart.find({ userId }).populate("productId"); // populate بيانات المنتج كاملة
}

async function removeFromCart(userId, productId) {
    return await Cart.deleteOne({ userId, productId });
}

module.exports = { addToCart, getCart, removeFromCart };