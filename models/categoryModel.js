const mongoose = require("mongoose");

categorySchema = new mongoose.Schema({
	name: String,
});

const Category = mongoose.model("Category", categorySchema);
module.exports = { Category, categorySchema };