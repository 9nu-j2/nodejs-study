const express = require("express");
const postsRouter = express.Router();
const postsController = require("../controllers/posts.constroller");

postsRouter.get("/", postsController.getPost);

module.exports = postsRouter;
