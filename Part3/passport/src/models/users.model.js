const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
  },
});

userSchema.method.comparePassword = function (plainPassword, cb) {
  // bcrypt 비교 원래는 해줘야함
  // plain password => client, this.password => 데이터베이스에 있는 비밀번호
  if (plainPassword === this.passwod) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({ error: "error" });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
