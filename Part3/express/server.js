const express = require("express");
const usersController = require("./controllers/users.controller");
const postsController = require("./controllers/posts.constroller");
const PORT = 4000;

const app = express();

app.use(express.json()); // body parser 대체 내장 모듈
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method}, ${req.url}`);
  next();
  const diffTime = Date.now() - start;

  console.log(`${req.method} ${req.url} ${diffTime}ms`);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/users", usersController.getUsers);
app.get("/users/:userId", usersController.getUser);
app.post("/users", usersController.postUser);

app.get(" /posts", postsController.getPost);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
