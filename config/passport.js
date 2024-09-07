import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../models/user_schema.js";
import { validatePassword } from "../utils/password.js";

function passportConfig() {
  const options = { usernameField: "email" };

  const verify = (email, password, cb) => {
    let userObj;
    userModel
      .findOne({ email })
      .then((user) => {
        if (!user) {
          cb(null, false, { field: "email", value: "Email does not exist" });
          return;
        }
        userObj = user;
        return validatePassword(password, user.salt, user.hash);
      })
      .then((isValid) => {
        if (isValid == undefined) return;
        if (!isValid) {
          cb(null, false, { field: "password", value: "Incorrect password" });
          return;
        }
        cb(null, userObj);
      });
  };

  passport.use(new LocalStrategy(options, verify));

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, {
        id: user.id,
        email: user.email,
        displayname: user.displayname,
        role: user.role
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}

export default passportConfig;
