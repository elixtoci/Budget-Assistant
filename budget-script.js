// Income object constructor function
function Income(name, amount, recurring) {
    this.name = name;
    this.amount = amount;
    this.recurring = recurring;
}

// Expense object constructor function
function Expense(name, amount, recurring) {
    this.name = name;
    this.amount = amount;
    this.recurring = recurring;
}

// Create income objects
const income1 = new Income('Salary', 1000, true);
const income2 = new Income('Freelance', 500, true);
const income3 = new Income('Job 1', 450, true);
const income4 = new Income('Job 2', 150, true);
const income5 = new Income('Night Job', 100, true);

// Create expense objects
const expense1 = new Expense('Groceries', 300, true);
const expense2 = new Expense('Transport', 250, true);
const expense3 = new Expense('Beauty', 50, true);
const expense4 = new Expense('Rent', 500, true);
const expense5 = new Expense('Bills', 100, true);

// Store income objects in session storage
sessionStorage.setItem('income1', JSON.stringify(income1));
sessionStorage.setItem('income2', JSON.stringify(income2));
sessionStorage.setItem('income3', JSON.stringify(income3));
sessionStorage.setItem('income4', JSON.stringify(income4));
sessionStorage.setItem('income5', JSON.stringify(income5));

// Store expense objects in session storage
sessionStorage.setItem('expense1', JSON.stringify(expense1));
sessionStorage.setItem('expense2', JSON.stringify(expense2));
sessionStorage.setItem('expense3', JSON.stringify(expense3));
sessionStorage.setItem('expense4', JSON.stringify(expense4));
sessionStorage.setItem('expense5', JSON.stringify(expense5));

// Function to display income items and add another entry
function displayIncomeAndAddEntry() {
    let incomeEntries = "";
    for (let i = 1; i <= 6; i++) {
        const incomeKey = `income${i}`;
        const incomeJSON = sessionStorage.getItem(incomeKey);
        if (incomeJSON) {
            const income = JSON.parse(incomeJSON);
            incomeEntries += `${income.name}: $${income.amount} (${income.recurring ? 'Recurring' : 'One-time'})\n`;
        }
    }

    const name = prompt(`Your current income entries are:\n${incomeEntries}\nPlease enter the name of the new income entry:`);
    const amount = parseFloat(prompt(`Enter the amount for ${name}:`));
    const recurring = confirm(`Is ${name} recurring?`);
    
    const newIncome = new Income(name, amount, recurring);

    let emptySlotFound = false;
    for (let i = 1; i <= 6; i++) {
        const incomeKey = `income${i}`;
        if (!sessionStorage.getItem(incomeKey)) {
            sessionStorage.setItem(incomeKey, JSON.stringify(newIncome));
            emptySlotFound = true;
            break;
        }
    }

    if (!emptySlotFound) {
        alert("You have reached the maximum number of income entries (5).");
    }
}

// Function to display expense items and add another entry
function displayExpenseAndAddEntry() {
    let expenseEntries = "";
    for (let i = 1; i <= 6; i++) {
        const expenseKey = `expense${i}`;
        const expenseJSON = sessionStorage.getItem(expenseKey);
        if (expenseJSON) {
            const expense = JSON.parse(expenseJSON);
            expenseEntries += `${expense.name}: $${expense.amount} (${expense.recurring ? 'Recurring' : 'One-time'})\n`;
        }
    }

    const name = prompt(`Your current expense entries are:\n${expenseEntries}\nPlease enter the name of the new expense entry:`);
    const amount = parseFloat(prompt(`Enter the amount for ${name}:`));
    const recurring = confirm(`Is ${name} recurring?`);
    
    const newExpense = new Expense(name, amount, recurring);

    let emptySlotFound = false;
    for (let i = 1; i <= 6; i++) {
        const expenseKey = `expense${i}`;
        if (!sessionStorage.getItem(expenseKey)) {
            sessionStorage.setItem(expenseKey, JSON.stringify(newExpense));
            emptySlotFound = true;
            break;
        }
    }

    if (!emptySlotFound) {
        alert("You have reached the maximum number of expense entries (5).");
    }
}

/// Function to calculate and display disposable income
function calculateDisposableIncome() {
    let totalIncome = 0;
    for (let i = 1; i <= 6; i++) {
        const incomeKey = `income${i}`;
        const incomeJSON = sessionStorage.getItem(incomeKey);
        if (incomeJSON) {
            const income = JSON.parse(incomeJSON);
            totalIncome += income.amount;
        }
    }

    let totalExpenses = 0;
    for (let i = 1; i <= 6; i++) {
        const expenseKey = `expense${i}`;
        const expenseJSON = sessionStorage.getItem(expenseKey);
        if (expenseJSON) {
            const expense = JSON.parse(expenseJSON);
            totalExpenses += expense.amount;
        }
    }

    const disposableIncome = totalIncome - totalExpenses;
    alert(`Your total disposable income is: $${disposableIncome}`);

    const savingsInput = parseFloat(prompt("How much of your disposable income would you like to put into savings?"));
    const savings = isNaN(savingsInput) ? 0 : savingsInput;

    const remainingDisposableIncome = disposableIncome - savings;
    alert(`After putting $${savings} into savings, your remaining disposable income is: $${remainingDisposableIncome}`);
}
