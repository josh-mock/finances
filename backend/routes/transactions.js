import express from "express";
import {
  getAllTransactions,
  createTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.post("/", createTransaction);

export default router;
