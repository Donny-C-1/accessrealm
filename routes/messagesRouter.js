import { Router } from "express";
import {
  createMessage,
  displayCreatePage,
  displayMessagesPage
} from "../controllers/messages_controller.js";
import { checkAuth } from "../controllers/auth_controller.js";

const router = Router();

router.route("/").get(displayMessagesPage);

router
  .route("/create")
  .get(checkAuth, displayCreatePage)
  .post(checkAuth, createMessage);

export default router;
