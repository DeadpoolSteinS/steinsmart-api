const express = require("express");
const ratingRouter = express.Router();
const ratingController = require("../controllers/ratingController");

ratingRouter.post("/api/add_rating", ratingController.addRating);

module.exports = ratingRouter;
