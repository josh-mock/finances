import express from "express";
import { getFbarTable } from "../controllers/fbarController.js";

const router = express.Router();

router.get("/", getFbarTable);

export default router;
