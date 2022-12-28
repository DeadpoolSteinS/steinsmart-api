const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/api/get_category/:id", categoryController.getCategory);
categoryRouter.get("/api/get_all_category", categoryController.getAllCategory);

module.exports = categoryRouter;