const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    quantity: { type: Number, default: 1 }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };