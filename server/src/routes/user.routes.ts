import { Router } from "express";
import { updateUser, getCurrentUser } from "../controllers/user.controller";
import authenticateToken from "../middleware/auth.middleware";

const router = Router();
router.patch("/", authenticateToken, updateUser);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
