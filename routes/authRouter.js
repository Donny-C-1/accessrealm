import { Router } from "express";
import {
  loginGet,
  loginPost,
  logout,
  signupGet,
  signupPost
} from "../controllers/auth_controller.js";

const router = Router();
router.route("/login").get(loginGet).post(loginPost);

router.route("/signup").get(signupGet).post(signupPost);

router.route("/logout").get(logout);

export default router;
