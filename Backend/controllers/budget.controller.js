import Budget from "../models/budget.model.js";
import Transaction from "../models/transaction.model.js";

export const setBudget = async (req, res) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      user: req.userId
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBudgetProgress = async (req, res) => {
  try {
    const { month } = req.params;

    const budgets = await Budget.find({
      user: req.userId,
      month
    });

    const expenses = await Transaction.find({
      user: req.userId,
      type: "expense"
    });

    const result = budgets.map((budget) => {
      const spent = expenses
        .filter(e => e.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0);

      return {
        category: budget.category,
        budget: budget.amount,
        spent,
        remaining: budget.amount - spent
      };
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
