import { Router } from "express";
import {
  confirmMember,
  displayMemberPage
} from "../controllers/member_controller.js";
import { checkAuth } from "../controllers/auth_controller.js";

const router = Router();

router
  .route("/")
  .get(checkAuth, displayMemberPage)
  .post(checkAuth, confirmMember);

export default router;
