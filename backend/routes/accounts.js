import express from "express";
import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  updateAccount
} from "../controllers/accountsController.js";

const router = express.Router();

router.get("/", getAllAccounts);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;
