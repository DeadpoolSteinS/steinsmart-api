const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  detail: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };
