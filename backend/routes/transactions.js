import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
