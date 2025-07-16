import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updatePassword,
} from "../controllers/auth.controller";
import authenticateToken from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/password", authenticateToken, updatePassword);

export default router;
