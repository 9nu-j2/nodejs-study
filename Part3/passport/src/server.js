const express = require("express");
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const path = require("path");
const { nextTick } = require("process");
const User = require("./models/users.model");
const app = express();
const setMongo = require("./setting");

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

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

app.post("/login", (req, res) => {
  // 로그인 전략 사용. local, google, facebook 등
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ msg: info });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  // user 객체를 생성합니다
  const user = new User(req.body);
  // user 컬렉션에 유저를 비동기로 저장합니다
  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
