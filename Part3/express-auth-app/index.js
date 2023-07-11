const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const ACCESS_TOKEN_SECRET = "superSecret";
const posts = [
  {
    username: "John",
    title: "Post 1",
  },
  {
    username: "Han",
    title: "Post 2",
  },
];

const PORT = 4000;

app.use(express.json());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt 이용 토큰 생성하기
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); env로 환경변수를 분리하는게 정석
  res.json({ accessToken: accessToken });
});

app.get("/posts", authMiddleware, (req, res) => {
  res.json(posts);
}); // middleware를 생성하여 요청이 middleware를 통과하여 들어오게 해줄 수 있음

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // token 부분만 추출
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
} // 인증된 유저만 이용할 수 있는 서비스에는 이 middleware를 추가해주면 토큰 검증이 가능

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
