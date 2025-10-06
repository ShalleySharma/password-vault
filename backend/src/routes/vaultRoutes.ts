import express from "express";
import { addVaultItem, getVaultItems, updateVaultItem, deleteVaultItem } from "../controllers/vaultController.js";

const router = express.Router();

router.post("/add", addVaultItem);
router.get("/:userId", getVaultItems);
router.put("/:id", updateVaultItem);
router.delete("/:id", deleteVaultItem);

export default router;
