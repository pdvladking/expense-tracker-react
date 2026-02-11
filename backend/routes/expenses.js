import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Expense from './models/Expense.js';

const router = express.Router();

// Get all expenses for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new expense
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const newExpense = new Expense({
      userId: req.user.id,
      description,
      amount,
      category,
      date,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
