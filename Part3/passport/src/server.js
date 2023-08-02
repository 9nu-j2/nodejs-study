const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const app = express();
const setMongo = require("./setting");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
mongoose
  .connect(setMongo)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/static", express.static(path.join(__dirname, "public"))); // 정작 파일 웹 제공, 절대경로로 제공

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

const port = 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
