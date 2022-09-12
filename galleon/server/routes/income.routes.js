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

//  GET /api/profile/income -  Retrieves all income
router.get("/income", (req, res, next) => {
  Income.find()
    /*     .populate("user") */
    .then((income) => res.json(income))
    .catch((err) => res.json(err));
});

//  GET /api/profile/income:incomeID -  Retrieves a specific income by id
router.get("/income/:incomeID", (req, res, next) => {
  const { incomeID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(incomeID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Income.findById(incomeID)
    /*   .populate("tasks") */
    .then((income) => res.status(200).json(income))
    .catch((error) => res.json(error));
});

// PUT  /api/profile/income/:incomeID  -  Updates a specific income by id
router.put("/income/:incomeID", (req, res, next) => {
  const { incomeID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(incomeID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Income.findByIdAndUpdate(incomeID, req.body, { new: true })
    .then((updatedIncome) => res.json(updatedIncome))
    .catch((error) => res.json(error));
});

// DELETE  /api/income/:incomeID  -  Deletes a specific income by id
router.delete("/income/:incomeID", (req, res, next) => {
  const { incomeID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(incomeID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Income.findByIdAndRemove(incomeID)
    .then(() =>
      res.json({
        message: `Expense with ${Income} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
