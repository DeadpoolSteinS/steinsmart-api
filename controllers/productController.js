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
    price: 10000,
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

exports.getProductById = async (req, res) => {
  try {
    // Dapatkan ID produk dari parameter rute
    const { id } = req.params;

    // Cari produk berdasarkan ID
    const product = await Product.findById(id).exec();

    if (product) {
      res.json({
        status: "sukses",
        message: "Data product berhasil diambil.",
        data: product,
      });
    } else {
      res.json({
        status: "gagal",
        message: "Tidak ada data product dengan ID tersebut di database.",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.searchProductByName = async (req, res) => {
  try {
    // Dapatkan nama produk dari parameter rute
    const { name } = req.params;

    // Cari produk berdasarkan nama
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    }).exec();

    if (products) {
      res.json({
        status: "sukses",
        message: "Data product berhasil diambil.",
        data: products,
      });
    } else {
      res.json({
        status: "gagal",
        message: "Tidak ada data product dengan nama tersebut di database.",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
