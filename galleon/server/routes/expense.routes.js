const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Expense = require("../models/Expense.model");

//  POST /api/profile/income  -  Creates an income
router.post("/expense", (req, res, next) => {
  const { title, description, expense, category } = req.body;

  Expense.create({ title, description, expense, category })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/profile/income -  Retrieves all incomes
router.get("/expense", (req, res, next) => {
  Expense.find()
    /*     .populate("user") */
    .then((expenses) => res.json(expenses))
    .catch((err) => res.json(err));
});

//  GET /api/profile/income/:incomeID -  Retrieves a specific income by id
router.get("/expense/:expenseID", (req, res, next) => {
  const { expenseID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(expenseID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
});

module.exports = router;
