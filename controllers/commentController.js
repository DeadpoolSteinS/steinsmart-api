const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

exports.addComment = async (req, res) => {
  // Mengkonversi string menjadi tipe data ObjectId
  const accountId = mongoose.Types.ObjectId(req.body.accountId);
  const productId = mongoose.Types.ObjectId(req.body.productId);

  const comment = new Comment({
    accountId: accountId,
    productId: productId,
    desc: req.body.desc,
  });

  try {
    await comment.save();
    res.json({
      status: "success",
      message: "Comment added",
      data: comment,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getCommentByIdProduct = async (req, res) => {
  try {
    // Dapatkan ID produk dari parameter rute
    const { idProduct } = req.params;

    // Cari produk berdasarkan ID
    const comments = await Comment.find({ productId: idProduct })
      .populate("accountId")
      .exec();

    if (comments) {
      res.json({
        status: "sukses",
        message: "Data comment berhasil diambil.",
        data: comments,
      });
    } else {
      res.json({
        status: "gagal",
        message:
          "Tidak ada data comment dengan ID produk tersebut di database.",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
