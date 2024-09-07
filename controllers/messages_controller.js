import { body, matchedData } from "express-validator";
import message from "../models/message_schema.js";
import asyncHandler from "express-async-handler";

const displayMessagesPage = asyncHandler(async function (req, res) {
  const messages = await message.find();
  if (!req.user || req.user.role == "guest") {
    messages.forEach((m) => ((m.author = "Anonymous"), (m.createdOn = null)));
  }
  res.locals.messages = messages.sort((v1, v2) => v2.createdOn - v1.createdOn);
  res.locals.user = req.user;
  res.render("messages");
});

export function displayCreatePage(req, res) {
  res.render("create_message");
}

const createMessage = [
  body("title"),
  body("content"),
  function (req, res, next) {
    // Store in a db
    next();
  },
  asyncHandler(async function (req, res) {
    const data = matchedData(req);

    await message.create({
      title: data.title,
      content: data.content,
      createdOn: Date.now(),
      author: req.user.displayname
    });

    res.redirect("/messages");
  })
];

export { createMessage, displayMessagesPage };
