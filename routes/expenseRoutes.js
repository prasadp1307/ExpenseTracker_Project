const express = require('express');
const expenseController = require('../controllers/expenseController');
// const authenticate = require('../middleware/authentication');

const router = express.Router();


router.get('/get-expenses',expenseController.getExpenses);
router.post('/add-expense',expenseController.addExpense);
router.delete('/delete-expense/:id',expenseController.deleteExpense);

module.exports = router;