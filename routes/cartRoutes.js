const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");

cartRouter.post("/api/add_to_cart", cartController.addToCart);
cartRouter.get("/api/account_cart/:accountId", cartController.getAccountCart);
cartRouter.delete(
  "/api/:cartId/:productId",
  cartController.removeProductFromCart
);
cartRouter.delete("/api/cart/delete/:cartId", cartController.deleteCart);

module.exports = cartRouter;
