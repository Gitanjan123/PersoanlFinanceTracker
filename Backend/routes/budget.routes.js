import express from "express";
import { setBudget, getBudgetProgress } from "../controllers/budget.controller.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuth, setBudget);
router.get("/:month", isAuth, getBudgetProgress);

export default router;
