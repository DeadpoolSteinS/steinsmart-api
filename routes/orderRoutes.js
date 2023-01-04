const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/api/add_to_order", orderController.addToOrder);
orderRouter.get("/api/account_order/:accountId", orderController.getAccountOrder);
orderRouter.post("/api/update_order_status", orderController.updateOrderStatus);

module.exports = orderRouter;
