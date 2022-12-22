const express = require("express");
const accountRouter = express.Router();
const accountController = require("../controllers/accountController");

accountRouter.post("/api/login", accountController.verifyLogin);
accountRouter.post("/api/register", accountController.addAccount);

module.exports = accountRouter;
