const productModel = require("../models/products.model");

async function createProduct(req, res, next) {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const allproducts = await productModel.find({});
    res.status(200).json(allproducts);
  } catch (err) {
    console.log(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    let updateProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
  } catch {}
}

module.exports = { createProduct, getProducts, getProductById, updateProduct };
