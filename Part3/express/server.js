const express = require("express");

const PORT = 4000;

const Users = [
  {
    id: 0,
    name: "James",
  },
  {
    id: 1,
    name: "Chris",
  },
];

const app = express();

app.use(express.json()); // body parser 대체 내장 모듈
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method}, ${req.url}`);
  next();
  const diffTime = Date.now() - start;

  console.log(`${req.method} ${req.url} ${diffTime}ms`);
});

app.get("/users", (req, res) => {
  res.json(Users);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      //return을 삽입하지 않으면 밑에 까지 실행됨, 끊어주는 역할
      error: "Missing user name",
    });
  }
  // user 측에서 잘못된 값을 보냈을 경우 에러 반환

  const newUser = {
    name: req.body.name,
    id: Users.length,
  };
  Users.push(newUser);
  res.json(newUser);
});

app.get("/users/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const user = Users[userId];
  if (user) {
    res.jsonp(user);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
