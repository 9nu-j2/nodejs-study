const passport = require("passport");
const User = require("../models/users.model");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { googleClientID, googleCluentSecret } = require("../setting");

const localStrategyConfig = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  (email, password, done) => {
    User.findOne({
      email: email.toLocaleLowerCase(),
    })
      .then((user, err) => {
        console.log(user.comparePassword);
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found` });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleCluentSecret,
    callbackURL: "/auth/google/callback",
    scope: ["email", "profile"],
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.googleId = profile.id;
          user
            .save()
            .then(done(null, user))
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use("local", localStrategyConfig);

passport.use("google", googleStrategyConfig);
