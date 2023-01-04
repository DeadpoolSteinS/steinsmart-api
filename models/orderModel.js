const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		accountId: { type: mongoose.Types.ObjectId, ref: "Account" },
		product: [
			{
				productId: { type: mongoose.Types.ObjectId, ref: "Product" },
				qty: Number,
			},
		],
		courier: String,
		payment: String,
		status: {
			type: String,
			enum: ["Menunggu pembayaran", "Sedang dikirim", "Selesai"],
			default: "Menunggu pembayaran"
		}
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order, orderSchema };
