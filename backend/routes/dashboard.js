import express from "express";
import {
  getBalancesTable,
  getBalancesGraph,
} from "../controllers/dashboard/dashboardController.js";
const router = express.Router();

router.get("/balances/table", getBalancesTable);
router.get("/balances/graph", getBalancesGraph);

export default router;
