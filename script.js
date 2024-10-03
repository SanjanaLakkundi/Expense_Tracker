// Get elements
const addIncomeBtn = document.getElementById('addIncome');
const addExpenseBtn = document.getElementById('addExpense');
const transactionList = document.getElementById('transactionList');
const totalIncomeDisplay = document.getElementById('totalIncome');
const totalExpensesDisplay = document.getElementById('totalExpenses');
const netIncomeDisplay = document.getElementById('netIncome');

// Variables to track total income and expenses
let totalIncome = 0;
let totalExpenses = 0;

// Load transactions from local storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
loadTransactions();

// Event listener for adding income transactions
addIncomeBtn.addEventListener('click', addIncome);

// Event listener for adding expense transactions
addExpenseBtn.addEventListener('click', addExpense);

function addIncome() {
    const date = document.getElementById('incomeDate').value;
    const description = document.getElementById('incomeDescription').value;
    const amount = parseFloat(document.getElementById('incomeAmount').value);

    if (!date || !description || isNaN(amount) || amount <= 0) {
        alert('Please enter valid income details.');
        return;
    }

    const incomeTransaction = { date, description, category: 'Income', amount };
    transactions.push(incomeTransaction);
    saveTransactions();
    loadTransactions();

    // Clear inputs
    document.getElementById('incomeDate').value = '';
    document.getElementById('incomeDescription').value = '';
    document.getElementById('incomeAmount').value = '';
}

function addExpense() {
    const date = document.getElementById('expenseDate').value;
    const description = document.getElementById('expenseDescription').value;
    const category = document.getElementById('expenseCategory').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (!date || !description || !category || isNaN(amount) || amount <= 0) {
        alert('Please enter valid expense details.');
        return;
    }

    const expenseTransaction = { date, description, category, amount: -amount }; // Store as negative for expenses
    transactions.push(expenseTransaction);
    saveTransactions();
    loadTransactions();

    // Clear inputs
    document.getElementById('expenseDate').value = '';
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseCategory').value = '';
    document.getElementById('expenseAmount').value = '';
}

function loadTransactions() {
    transactionList.innerHTML = '';
    totalIncome = 0;
    totalExpenses = 0;

    transactions.forEach((trans, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${trans.date} - ${trans.description} (${trans.category}): $${Math.abs(trans.amount).toFixed(2)} <button onclick="deleteTransaction(${index})">Delete</button>`;
        transactionList.appendChild(listItem);

        // Calculate totals
        if (trans.amount > 0) {
            totalIncome += trans.amount; // Sum for income
        } else {
            totalExpenses -= Math.abs(trans.amount); // Sum for expenses
        }
    });

    // Update displayed totals
    totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
    netIncomeDisplay.textContent = (totalIncome + totalExpenses).toFixed(2); // Calculate net income
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions();
    loadTransactions();
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}