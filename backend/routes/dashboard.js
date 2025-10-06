import express from "express";
import {
  getBalancesTable,
  getBalancesGraph,
  getNetTable,
} from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/balances/table", getBalancesTable);
router.get("/balances/graph", getBalancesGraph);
router.get("/net/table", getNetTable);

export default router;
