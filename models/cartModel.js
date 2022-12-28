const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
	accountId: { type: mongoose.Types.ObjectId, ref: "Account" },
	product: [{
		productId: { type: mongoose.Types.ObjectId, ref: "Product" },
		price: Number,
		qty: Number
	}],
}, {
	timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = { Cart, cartSchema };