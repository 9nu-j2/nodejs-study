const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/products.controller");

productsRouter.get("/", productsController.createProduct);

module.exports = productsRouter;
