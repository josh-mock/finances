import express from "express";
import {
  getBalancesTable,
  getBalancesGraph,
  getNetTable,
  getNetGraph,
  getBudgetTable,
} from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/balances/table", getBalancesTable);
router.get("/balances/graph", getBalancesGraph);
router.get("/net/table", getNetTable);
router.get("/net/graph", getNetGraph);
router.get("/budget/table", getBudgetTable);

export default router;
