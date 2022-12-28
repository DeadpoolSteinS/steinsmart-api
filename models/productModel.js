const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  detail: String,
  price: Number,
  image: String,
  category_id: { type: mongoose.Types.ObjectId, ref: "Category" },
  discount_id: { type: mongoose.Types.ObjectId, ref: "Discount" }
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };
