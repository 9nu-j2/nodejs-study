const Users = require("../models/users.model");

function getUsers(req, res) {
  res.send(Users);
}

function getUser(req, res) {
  const userId = Number(req.params.userId);
  const user = Users[userId];
  if (user) {
    res.jsonp(user);
  } else {
    res.sendStatus(404);
  }
}

function postUser(req, res) {
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
}

module.exports = {
  getUsers,
  getUser,
  postUser,
};
