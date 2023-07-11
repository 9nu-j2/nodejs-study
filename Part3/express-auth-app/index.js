const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const ACCESS_TOKEN_SECRET = "superSecret";
const REFRESH_TOKEN_SECRET = "supersuperSecret";
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
app.use(cookieParser());

app.get("/", (req, res) => {});

let refreshTokens = []; // 데이터베이스 역할
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt 이용 토큰 생성하기
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" }); env로 환경변수를 분리하는게 정석

  // jwt 이용 refresh 토큰도 생성하기
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" }); env로 환경변수를 분리하는게 정석

  refreshTokens.push(refreshToken);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //쿠키 자체에서도 유효시간을 설정할 수 있음
  }); //refresh Token을 쿠키에 저장함, httpOnly option을 통해 탈취가 불가능하게 만듬
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

app.get("/refresh", (req, res) => {
  // body => parsing => req.body
  // cookies => parsing => req.cookies
  // 쿠키 정보를 파싱하기 위한 미들웨어 사용: cookie-parser
  const cookies = req.cookies;

  const refreshToken = cookies.jwt;
  // refreshtoken이 데이터베이스에 있는 토큰인지 확인
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  // AccessToken 재발급
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ name: user.name }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    res.json({ accessToken });
  });
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
