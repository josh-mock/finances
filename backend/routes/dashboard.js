import express from "express";
import { getBalances } from "../controllers/dashboard/dashboardController.js";
const router = express.Router();

router.get("/balances", getBalances);

export default router;
