import { Router } from "express";
import {
  loginController,
  userController,
  registerController,
  refreshTokenController,
} from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/user", auth, userController.users);
router.post("/token", refreshTokenController.refresh);
router.post("/logout", auth, loginController.logout);

export default router;
