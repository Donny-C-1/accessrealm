import { body, validationResult, matchedData } from "express-validator";
import passport from "passport";
import asyncHandler from "express-async-handler";
import userModel from "../models/user_schema.js";
import { encrypt } from "../utils/password.js";

function checkAuth(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function loginGet(req, res) {
  res.locals.emailError = req.session.emailError;
  res.locals.passwordError = req.session.passwordError;
  req.session.emailError = req.session.passwordError = null;

  res.render("login");
}

const loginPost = [
  body("email"),
  body("password"),
  function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.redirect("/auth/login");
    }

    passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        if (info.field === "email") {
          req.session.emailError = info.value;
        } else {
          req.session.passwordError = info.value;
        }
        return res.redirect(`/auth/login`);
      }

      req.login(user, (err) => {
        if (err) return next(err);
        res.redirect("/");
      });
    })(req, res, next);
  }
];

function signupGet(req, res) {
  res.render("signup");
}

const signupPost = [
  body("firstname").trim(),
  body("lastname").trim(),
  body("displayname").trim(),
  body("email").trim(),
  body("password"),
  body("confirmPassword"),
  function (req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    // Do some more validation and sanitizations
    res.redirect("/auth/signup");
  },
  asyncHandler(async function (req, res, next) {
    const data = matchedData(req);

    const { hash, salt } = await encrypt(data.password);

    const user = await userModel.create({
      firstname: data.firstname,
      lastname: data.lastname,
      displayname: data.displayname,
      email: data.email,
      role: "guest",
      hash,
      salt
    });

    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })
];

function logout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
}
export { loginGet, loginPost, signupGet, signupPost, checkAuth, logout };
