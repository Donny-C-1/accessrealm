import userModel from "../models/user_schema.js";
import asyncHandler from "express-async-handler";

export function displayMemberPage(req, res, next) {
  res.render("member");
}

const confirmMember = asyncHandler(async function (req, res, next) {
  if (req.body.membercode.toLowerCase() === "kingsman") {
    await userModel.findByIdAndUpdate(req.user.id, { role: "member" });
    req.session.passport.user.role = "member";
  }
  res.redirect("/messages");
});

export { confirmMember };
