const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    desc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
