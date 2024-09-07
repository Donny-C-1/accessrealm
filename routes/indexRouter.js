import express from "express";
import authRouter from "./authRouter.js";
import messageRouter from "./messagesRouter.js";
import memberRouter from "./memberRouter.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.locals.user = req.user;
  res.render("index");
});

router.use("/auth", authRouter);

router.use("/messages", messageRouter);

router.use("/membership", memberRouter);

export default router;
