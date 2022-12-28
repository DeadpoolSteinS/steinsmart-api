const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get("/api/products", productController.getAllProducts);
productRouter.post("/api/add_product", productController.addProduct);
productRouter.get("/api/product/:id", productController.getProductById);
productRouter.get("/api/search/:name", productController.searchProductByName);

module.exports = productRouter;
