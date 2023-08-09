const cookieSession = require("cookie-session");
const express = require("express");
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const path = require("path");
const User = require("./models/users.model");
const app = express();

require("dotenv").config();
// 라우터 설정용
const mainRouter = require("./routes/main.router");
const usersRouter = require("./routes/users.router");

// 쿠키 세션 저장을 위한 미들웨어
app.use(
  cookieSession({
    name: "cookiesessionname",
    keys: [process.env.COOKIE_ENCRYPTION_KEY],
  })
);

app.use(function (req, res, next) {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

// passport 사용을 위한 미들웨어
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// express 사용을 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view 엔진 관련
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// mongoDB 연결
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// 정적파일 제공용 미들웨어
app.use("/static", express.static(path.join(__dirname, "public"))); // 정작 파일 웹 제공, 절대경로로 제공

// 라우팅

app.use("/", mainRouter);
app.use("/auth", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
