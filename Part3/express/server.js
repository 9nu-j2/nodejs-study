const express = require("express");
const path = require("path");
const PORT = 4000;

const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // 템플릿 엔진 서버 등록

app.use("/static", express.static(path.join(__dirname, "public"))); // 정작 파일 웹 제공, 절대경로로 제공
app.get("/", (req, res) => {
  res.render("index", {
    imageTitle: "It is a forest 2",
  });
});

app.use(express.json()); // body parser 대체 내장 모듈

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method}, ${req.url}`);
  next();
  const diffTime = Date.now() - start;

  console.log(`${req.method} ${req.baseUrl} ${req.url} ${diffTime}ms`);
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
