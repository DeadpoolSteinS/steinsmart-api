const { Cart } = require("../models/cartModel");
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  const accountId = mongoose.Types.ObjectId(req.body.accountId);
  const productId = mongoose.Types.ObjectId(req.body.productId);

  try {
    const cart = await Cart.findOne({ accountId: accountId }).exec();

    // cek apakah dokumen cart sudah ada untuk akun ini
    if (cart) {
      const prodIndex = cart.product.findIndex(
        (prod) => prod.productId.toString() == productId.toString()
      );

      // cek apakah produk yang sama ada
      if (prodIndex > -1) {
        cart.product[prodIndex].qty++;

        await cart.save();
        res.json({
          status: "success",
          message: "Added 1 to quantity in cart",
          data: cart,
        });
      } else {
        // tambahkan produk baru ke cart
        cart.product.push({ productId: productId, qty: 1 });

        await cart.save();
        res.json({
          status: "success",
          message: "Added to cart",
          data: cart,
        });
      }
    } else {
      const cart = new Cart({
        accountId: accountId,
        product: [{ productId: productId, qty: 1 }],
      });

      await cart.save();
      res.json({
        status: "success",
        message: "Added to cart",
        data: cart,
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
    const { accountId } = req.params;

    const cart = await Cart.findOne({ accountId: accountId })
      .populate("product.productId")
      .exec();

    if (cart) {
      res.json({
        status: "sukses",
        message: "Data cart akun berhasil diambil",
        data: cart,
      });
    } else {
      res.json({
        staus: "gagal",
        message: "Tidak ada data cart dari akun ini",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
