import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware";
import {
  createEntry,
  deleteEntry,
  getAllEntries,
  getDeletedEntries,
  getSingleEntry,
  restoreDeletedEntry,
  softDeleteEntry,
  summarizeText,
  updateEntry,
} from "../controllers/entry.controller";

const router = Router();

router.post("/", authenticateToken, createEntry);
router.get("/trash", authenticateToken, getDeletedEntries);
router.get("/", authenticateToken, getAllEntries);
router.get("/:id", authenticateToken, getSingleEntry);
router.patch("/:id", authenticateToken, updateEntry);
router.delete("/:id", authenticateToken, deleteEntry);
router.patch("/soft-delete/:id", authenticateToken, softDeleteEntry);
router.patch("/restore/:id", authenticateToken, restoreDeletedEntry);
router.post("/summarize", authenticateToken, summarizeText);

export default router;
