import express from "express";
import {
  getBalancesTable,
  getBalancesGraph,
  getNetTable,
  getNetGraph,
  getBudgetTable,
  getUkInterestTable,
  getUsInterestTable,
} from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/balances/table", getBalancesTable);
router.get("/balances/graph", getBalancesGraph);
router.get("/net/table", getNetTable);
router.get("/net/graph", getNetGraph);
router.get("/budget/table", getBudgetTable);
router.get("/interest/uk/table", getUkInterestTable);
router.get("/interest/us/table", getUsInterestTable);

export default router;
