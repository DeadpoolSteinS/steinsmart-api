const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  accountId: { type: mongoose.Types.ObjectId, ref: "Account" },
  productId: { type: mongoose.Types.ObjectId, ref: "Product" },
  value: { type: Number, required: true },
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
