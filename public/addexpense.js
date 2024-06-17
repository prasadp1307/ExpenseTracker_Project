// const { get } = require("../routes/userRoutes"); 

const addExpenseForm = document.querySelector('.addExpenseForm');
const expenseamount = document.querySelector('#expenseamount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const expenseList = document.querySelector('.expenseList');
const token = localStorage.getItem('token');

console.log('Token:', token); 

const addToExpenseList = (expense) => {
    const newLi = document.createElement('li');
    newLi.innerHTML = `<span>${expense.expenseamount} - ${expense.category} - ${expense.description} </span><button class="deleteExpense" id="${expense.id}">Delete Expense</button>`;
    expenseList.appendChild(newLi);
}

// Show Present Expenses (with pagination)
document.addEventListener('DOMContentLoaded', showExpenses);
async function showExpenses() {
    try {
        const getExpenses = await axios.get('http://localhost:4000/expenses/get-expense', {
            headers: { "Authorization": token }
        });
        console.log("Expenses retrieved:", getExpenses.data);
        if (getExpenses.data.length > 0) {
            getExpenses.data.forEach(expense => {
                addToExpenseList(expense);
            });
        } else {
            console.log('No expenses found');
        }
    } catch (err) {
        console.log(err);
    }
}


// Insert in DB
addExpenseForm.addEventListener('submit', postExpenses);
async function postExpenses(e) {
    try {
        e.preventDefault();
        const expense = {
            expenseamount: Number(expenseamount.value),
            description: description.value,
            category: category.value
        };
     
        const postedExpense = await axios.post('http://localhost:4000/expenses/add-expense', expense, { headers: { "Authorization": token } });
        addToExpenseList(postedExpense.data.newExpense);
    } catch (err) {
        console.log(err);
    }
}

// Delete Expense
document.addEventListener('click', deleteExpense);
async function deleteExpense(e) {
    try {
         if (e.target.classList.contains('deleteExpense')) {
            const expenseId = e.target.id;
            await axios.delete(`http://localhost:4000/expenses/${expenseId}`, { headers: { "Authorization": token } });
            e.target.parentElement.remove();
        }    
    
    } catch (err) {
        console.log(err);
    }
}

