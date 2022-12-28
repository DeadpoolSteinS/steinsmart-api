const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");

cartRouter.post("/api/add_to_cart", cartController.addToCart);
cartRouter.get("/api/account_cart", cartController.getAccountCart);

module.exports = cartRouter;