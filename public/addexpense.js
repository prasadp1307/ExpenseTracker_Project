const addExpenseForm = document.querySelector('.addExpenseForm');
const expenseamount = document.querySelector('#expenseamount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const expenseList = document.querySelector('.expenseList');

const token = localStorage.getItem('token');

const addToExpenseList = (expense) => {
    const newLi = document.createElement('li');
    newLi.innerHTML = `<span>${expense.expenseamount} - ${expense.category} - ${expense.description} </span><button class="deleteExpense" id="${expense.id}">Delete Expense</button>`;
    expenseList.appendChild(newLi);
}

// Insert in DB
addExpenseForm.addEventListener('submit', postExpenses);
async function postExpenses(e) {
    e.preventDefault();
    try {
        const expense = {
            expenseamount: expenseamount.value,
            description: description.value,
            category: category.value
        };
        const postedExpense = await axios.post('http://localhost:4000/expenses/addExpense', expense, { headers: { "Authorization": token } });
        addToExpenseList(postedExpense.data);
        addExpenseForm.reset(); // Reset form after successful submission
    } catch (err) {
        console.log(err);
    }
}

// Delete Expense
document.addEventListener('click', deleteExpense);
async function deleteExpense(e) {
    if (e.target.classList.contains('deleteExpense')) {
        try {
            const expenseId = e.target.id;
            await axios.delete(`http://localhost:4000/expenses/addExpense/${expenseId}`, { headers: { "Authorization": token } });
            e.target.parentElement.remove();
        } catch (err) {
            console.log(err);
        }
    }
}
