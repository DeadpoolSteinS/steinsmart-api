const { Order } = require("../models/orderModel");
const { Cart } = require("../models/cartModel");
const mongoose = require("mongoose");

exports.addToOrder = async (req, res) => {
  try {
    const cartId = mongoose.Types.ObjectId(req.body.cartId);
    const cart = await Cart.findOne({ _id: cartId }).exec();

    // cek apakah cart ada
    if (cart) {
      const order = new Order({
        accountId: cart.accountId,
        product: cart.product,
        courier: req.body.courier,
        payment: req.body.payment,
        status: "Menunggu pembayaran",
      });

      await order.save();
      res.json({
        status: "success",
        message: "Added to order",
        data: order,
      });
    } else {
      res.status(500).json({
        status: "failed",
        message: "Failed to add order, Cart not found",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAccountOrder = async (req, res) => {
  try {
    const { accountId } = req.params;

    const order = await Order.find({ accountId: accountId })
      .populate("product.productId")
      .exec();

    if (order) {
      res.json({
        status: "sukses",
        message: "Data order akun berhasil diambil",
        data: order,
      });
    } else {
      res.json({
        staus: "gagal",
        message: "Tidak ada data order dari akun ini",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = mongoose.Types.ObjectId(req.body.orderId);
    const order = await Order.findById(orderId).exec();

    if (order) {
      order.status = req.body.status;

      await order.save();
      res.json({
        status: "success",
        message: "Order status updated",
        data: order,
      });
    } else {
      res.json({
        status: "failed",
        message: "Failed to update order status, order not found",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
