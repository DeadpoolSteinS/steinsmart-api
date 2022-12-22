const { Product } = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).exec();

    if (products) {
      res.json({
        status: "sukses",
        message: "Semua data product berhasil diambil.",
        data: products,
      });
    } else {
      res.json({
        status: "gagal",
        message: "Tidak ada data product di database.",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    detail: req.body.detail,
    image: req.body.image,
  });

  try {
    await product.save();
    res.json({
      status: "sukses",
      message: "Product added",
      data: product,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
