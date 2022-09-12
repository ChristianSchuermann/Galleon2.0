const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Income = require("../models/Income.model");

//  POST /api/profile/income  -  Creates an income
router.post("/income", (req, res, next) => {
  const { title, description, income, category } = req.body;

  Income.create({ title, description, income, category })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/profile/income -  Retrieves all incomes
router.get("/income", (req, res, next) => {
  Income.find()
    /*     .populate("user") */
    .then((incomes) => res.json(incomes))
    .catch((err) => res.json(err));
});

//  GET /api/profile/income/:incomeID -  Retrieves a specific income by id
router.get("/income/:incomeID", (req, res, next) => {
  const { IncomeID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(IncomeID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
});

module.exports = router;
