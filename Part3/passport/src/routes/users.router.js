const express = require("express");
const usersRouter = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middlewares/auth");
const passport = require("passport");
const User = require("../models/users.model");

usersRouter.post("/login", (req, res, next) => {
  // 로그인 전략 사용. local, google, facebook 등
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log("no user found");
      return res.json({ msg: info });
    }

    // 로그인 성공시 세션 생성
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
});

usersRouter.post("/logout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

usersRouter.post("/signup", async (req, res) => {
  // user 객체를 생성합니다
  const user = new User(req.body);
  // user 컬렉션에 유저를 비동기로 저장합니다

  // {
  //   email: 'test1@naver.com',
  //   password: 'asdfasdfasdf',
  //   _id: Object(dfasdgasdg)
  // }

  try {
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

usersRouter.get("/google", passport.authenticate("google"));
usersRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = usersRouter;
