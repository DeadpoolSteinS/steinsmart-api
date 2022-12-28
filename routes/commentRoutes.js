const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");

commentRouter.get(
  "/api/comments/:idProduct",
  commentController.getCommentByIdProduct
);
commentRouter.post("/api/add_comment", commentController.addComment);

module.exports = commentRouter;
