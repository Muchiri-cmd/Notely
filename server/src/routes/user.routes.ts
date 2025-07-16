import { Router } from "express";
import { updateUser } from "../controllers/user.controller";
import authenticateToken from "../middleware/auth.middleware";

const router = Router();
router.patch("/", authenticateToken, updateUser);

export default router;
