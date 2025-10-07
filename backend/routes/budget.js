import express from "express";
import { getBudget, updateBudget } from "../controllers/budgetController.js";

const router = express.Router();

router.get("/", getBudget);
router.put("/", updateBudget);

export default router;
