const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Expense = require("../models/Expense.model");
const User = require("../models/User.model");

router.post("/expense", (req, res, next) => {
  const { title, description, expense, category } = req.body;

  Expense.create({ title, description, expense, category, user: { User } })
    .then((newExpense) => {
      return User.findByIdAndUpdate(
        { User },
        {
          $push: { expenses: newExpense._id },
        }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/expense", (req, res, next) => {
  Expense.find()
    .populate("user")
    .then((expenses) => res.json(expenses))
    .catch((err) => res.json(err));
});

router.get("/expense/:expenseID", (req, res, next) => {
  const { expenseID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(expenseID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Expense.findById(expenseID)
    .then((expense) => res.status(200).json(expense))
    .catch((error) => res.json(error));
});

router.put("/expense/:expenseID", (req, res, next) => {
  const { expenseID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(expenseID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Expense.findByIdAndUpdate(expenseID, req.body, { new: true })
    .then((updatedExpense) => res.json(updatedExpense))
    .catch((error) => res.json(error));
});

router.delete("/expense/:expenseID", (req, res, next) => {
  const { expenseID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(expenseID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Expense.findByIdAndRemove(expenseID)
    .then(() =>
      res.json({
        message: `Expense with ${Expense} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
