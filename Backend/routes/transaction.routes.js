import express from "express";
import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transaction.controller.js";

import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuth, addTransaction);
router.get("/", isAuth, getTransactions);


router.put("/:id", isAuth, updateTransaction);
router.delete("/:id", isAuth, deleteTransaction);

export default router;
