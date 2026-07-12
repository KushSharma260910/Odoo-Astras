const express = require("express");

const router = express.Router();

const {

    getExpenses,
    createExpense

} = require("../controllers/expenseController");


// GET ALL EXPENSES
router.get("/", getExpenses);


// CREATE EXPENSE
router.post("/", createExpense);


module.exports = router;