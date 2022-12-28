const { default: mongoose, now } = require("mongoose");
const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

exports.addToCart = async (req, res) => {
	const accountId = req.body.accountId;
	const productId = req.body.productId;

	try {
		const cart = await Cart.findOne({ accountId: accountId }).exec();
		const prod = await Product.findById(productId).exec();

		// cek apakah dokumen cart sudah ada untuk akun ini
		if (cart) {
			const prodIndex = cart.product.findIndex((prod) => prod.productId == productId);

			// cek apakah produk yang sama ada
			if (prodIndex > -1) {
				cart.product[prodIndex].qty++;
	
				await cart.save();
				res.json({
					status: "success",
					message: "Added 1 to quantity in cart",
					data: cart
				});
			} else {
				let cartHolder = cart.product.push({
					productId: productId,
					price: prod.price,
					qty: 1
				});

				await cart.save();
				res.json({
					status: "success",
					message: "Added to cart",
					data: cart
				});
			}
			
		} else {
			const cart = new Cart({
				accountId: accountId,
				product: [{
					productId: productId,
					price: prod.price,
					qty: 1
				}],
			});

			await cart.save();
			res.json({
				status: "success",
				message: "Added to cart",
				data: cart
			});
		}
		
	} catch (e) {
		res.status(500).json({ 
			error: e.message,
		 });
	}
};

exports.getAccountCart = async (req, res) => {
	try {
		const { id } = req.params;

		const cart = await Cart.findOne({ accountId: id });

		if (cart) {
			res.json({
				status: "sukses",
				message: "Data cart akun berhasil diambil",
				data: cart
			});
		} else {
			res.json({
				staus: "gagal",
				message: "Tidak ada data cart dari akun ini"
			});
		}
	} catch (e) {
		res.status(500).json({ error:e.message });
	}
};