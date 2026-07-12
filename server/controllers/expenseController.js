const expenseService = require("../services/expenseService");

exports.getExpenses = async (req, res) => {

    try {

        const expenses =
            await expenseService.getExpenses();

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.createExpense = async (req, res) => {

    try {

        const result =
            await expenseService.createExpense(req.body);

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};