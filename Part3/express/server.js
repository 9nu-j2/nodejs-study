const express = require("express");

const PORT = 4000;

const User = [
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

app.get("/users", (req, res) => {
  res.json(User);
});

app.get("/users/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const user = User[userId];
  if (user) {
    res.jsonp(user);
  } else {
    res.sendStatus(404);
  }
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
