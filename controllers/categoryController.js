const { Category } = require("../models/categoryModel");

exports.getCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id).exec();

		if (category) {
			res.json({
				status: "sukses",
				message: "Data category berhasil diambil",
				data: category
			});
		} else {
			res.json({
				status: "gagal",
				message: "Data category tidak ditemukan"
			})
		}
	} catch (e) {
		res.status(500).json({
			error: e.message
		});
	}
}

exports.getAllCategory = async (req, res) => {
	try {
		const category = await Category.find({}).exec();

		if(category) {
			res.json({
				status: "sukses",
				message: "Semua data category berhasil diambil",
				data: category
			})
		} else {
			res.json({
				status: "gagal",
				message: "Data category gagal diambil"
			});
		}
	} catch (e) {
		res.status(500).json({
			error: e.message
		});
	}
}