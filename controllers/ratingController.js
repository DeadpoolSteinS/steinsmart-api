const Rating = require("../models/ratingModel");
const mongoose = require("mongoose");

exports.addRating = async (req, res) => {
  // Mengkonversi string menjadi tipe data ObjectId
  const accountId = mongoose.Types.ObjectId(req.body.accountId);
  const productId = mongoose.Types.ObjectId(req.body.productId);

  const rating = new Rating({
    accountId: accountId,
    productId: productId,
    value: req.body.value,
    review: req.body.review
  });

  try {
    await rating.save();
    res.json({
      status: "success",
      message: "Rating added",
      data: rating,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
