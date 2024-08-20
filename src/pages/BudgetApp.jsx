import React, { useState, useEffect } from "react";
import data from "../assets/data/bankUsers.json";
import { toast, ToastContainer } from "react-toastify";

const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function BudgetTracker() {
    const [users, setUsers] = useState(data.filter(user => user.type === 'User'));
    const [show, setShow] = useState(false);
    const [expenseDescription, setExpenseDescription] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [budgetName, setBudgetName] = useState("");
    const [budgetAmount, setBudgetAmount] = useState("");
    const [expenseCategory, setExpenseCategory] = useState("");
    const [budgets, setBudgets] = useState([]);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const currentUser = users.find(u => u.username === loggedInUser?.username);

    useEffect(() => {
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        setBudgets(savedBudgets);
    }, []);

    if (!currentUser) {
        return <div>No user data found. Please log in again.</div>;
    }

    const addBudget = () => {
        const budgetCost = Number(budgetAmount);

        if (!budgetName.trim()) {
            toast.error("Budget name is required");
            return;
        }

        if (isNaN(budgetCost) || budgetCost <= 0) {
            toast.error("Invalid budget amount. Must be a number greater than zero.");
            return;
        }

        // Check for duplicate budget names
        const isDuplicate = budgets.some(b => b.name.toLowerCase() === budgetName.trim().toLowerCase());
        if (isDuplicate) {
            toast.error("A budget with this name already exists");
            return;
        }

        const newBudget = { name: budgetName, amount: budgetCost };
        const updatedBudgets = [...budgets, newBudget];
        setBudgets(updatedBudgets);
        localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
        toast.success(`Budget '${budgetName}' has been added`);

        setBudgetName("");
        setBudgetAmount("");
    };
    const addExpense = () => {
        const expenseCost = Number(expenseAmount);

        if (!expenseDescription.trim()) {
            toast.error("Expense description is required");
            return;
        }

        if (isNaN(expenseCost) || expenseCost <= 0) {
            toast.error("Invalid expense amount. Must be a number greater than zero.");
            return;
        }

        if (!expenseCategory.trim()) {
            toast.error("Expense category is required");
            return;
        }

        // Check for duplicate expenses
        const isDuplicate = (currentUser.expenses || []).some(expense =>
            expense.description.toLowerCase() === expenseDescription.trim().toLowerCase() &&
            expense.category.toLowerCase() === expenseCategory.trim().toLowerCase()
        );
        if (isDuplicate) {
            toast.error("An expense with this description and category already exists");
            return;
        }

        const updatedUsers = users.map((u) => {
            if (u.username === currentUser.username) {
                return {
                    ...u,
                    balance: u.balance - expenseCost,
                    expenses: [...(u.expenses || []), { description: expenseDescription, cost: expenseCost, category: expenseCategory, date: new Date().toISOString() }]
                };
            }
            return u;
        });

        setUsers(updatedUsers);
        toast.success(`${expenseDescription} has been added to ${expenseCategory}`);

        setExpenseDescription("");
        setExpenseAmount("");
        setExpenseCategory("");
        setShow(false);
    };

    const deleteExpense = (index) => {
        const updatedUsers = users.map((u) => {
            if (u.username === currentUser.username) {
                const updatedExpenses = u.expenses.filter((_, i) => i !== index);
                const removedExpense = u.expenses[index];
                return {
                    ...u,
                    balance: u.balance + removedExpense.cost,
                    expenses: updatedExpenses
                };
            }
            return u;
        });

        setUsers(updatedUsers);
        toast.success(`Expense successfully deleted`);
    };
    const deleteBudget = (name) => {
        // Remove the budget
        const updatedBudgets = budgets.filter(budget => budget.name !== name);

        // Remove expenses related to the budget
        const updatedUsers = users.map((u) => {
            if (u.username === currentUser.username) {
                const updatedExpenses = (u.expenses || []).filter(expense => expense.category !== name);
                return {
                    ...u,
                    expenses: updatedExpenses
                };
            }
            return u;
        });

        // Update state and local storage
        setBudgets(updatedBudgets);
        setUsers(updatedUsers);

        // Ensure both updated users and budgets are stored in localStorage
        localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        toast.success(`Budget '${name}' and related expenses have been deleted`);
    };
    const categories = [...budgets.map(b => b.name)];
    const categorizedExpenses = categories.reduce((acc, category) => {
        acc[category] = (currentUser.expenses || []).filter(expense => expense.category === category);
        return acc;
    }, {});

    // Get the most recent expenses (sorted by the most recent first)
    const recentExpenses = [...(currentUser.expenses || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
    // Calculate total budget and remaining budget and total expenses
    const totalBudgetAmount = budgets.reduce((total, budget) => total + budget.amount, 0);
    const totalExpensesAmount = (currentUser.expenses || []).reduce((total, expense) => total + expense.cost, 0);
    const totalRemainingAmount = totalBudgetAmount - totalExpensesAmount;
    const userBalance = loggedInUser?.balance;
    const remainingTotalBalance = userBalance - totalExpensesAmount;
    // Calculate total amount and remaining amount of each budget sorted by category
    const budgetSummary = budgets.map(budget => {
        const totalSpent = (currentUser.expenses || []).filter(expense => expense.category === budget.name).reduce((sum, expense) => sum + expense.cost, 0);
        const remainingAmount = budget.amount - totalSpent;
        return {
            name: budget.name,
            totalAmount: budget.amount,
            spentAmount: totalSpent,
            remainingAmount: remainingAmount
        };
    }).sort((a, b) => a.name.localeCompare(b.name)); // Sort by category name

    return (
        <div className="">
            <div className="min-w-[165vmin] bg-slate-40 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5 mt-20 mx-14">
                <div className="flex p-2.5"><span className="text-xl font-bold">Budget App</span></div>

                {/* User Info Section */}
                <div className="text-l p-2 flex flex-col item-start">
                    <div className="text-right"><span className="font-bold">Account Balance : </span>{formattedBalance.format(remainingTotalBalance)}</div>
                    <div className="font-bold text-l">{loggedInUser?.firstname} {loggedInUser?.lastname}</div>
                    <div>{loggedInUser?.type}</div>
                </div>
            </div>
            <div className="min-w-[165vmin] mx-14">
                <div className="grid grid-cols-2 gap-8 mt-5">
                    <div>{/* 1st column */}
                        {budgets.length > 0 && (
                            <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                                <div className="flex text-xl font-bold p-2.5"><span className="text-xl font-bold">Add Expenses</span></div>
                                <form className="flex flex-col items-start px-2.5 text-sm" onSubmit={(event) => {
                                    event.preventDefault();
                                    addExpense();
                                }}>
                                    <label>Expense Description:</label>
                                    <input
                                        type="text"
                                        value={expenseDescription}
                                        className="bg-white-light w-full py-1 px-2 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                        onChange={(event) => setExpenseDescription(event.target.value)}
                                    />
                                    <br />
                                    <label>Expense Amount:</label>
                                    <input
                                        type="text"
                                        className="bg-white-light w-full py-1 px-2 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                        value={expenseAmount}
                                        onChange={(event) => setExpenseAmount(event.target.value)}
                                    />
                                    <br />
                                    <label>Expense Category:</label>
                                    <select
                                        value={expenseCategory}
                                        className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                        onChange={(event) => setExpenseCategory(event.target.value)}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <br />
                                    <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Add Expense</button>
                                </form>
                            </div>
                        )}
                        <div>
                            <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8 text-sm mt-5">
                                <div className="flex text-xl font-bold p-2.5"><span className="text-xl font-bold">Add Budget</span></div>
                                <form className="flex flex-col items-start px-2.5 text-sm" onSubmit={(event) => {
                                    event.preventDefault();
                                    addBudget();
                                }}>
                                    <label>Budget Name:</label>
                                    <input
                                        type="text"
                                        className="bg-white-light w-full py-1 px-2 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                        value={budgetName}
                                        onChange={(event) => setBudgetName(event.target.value)}
                                    />
                                    <br />
                                    <label>Budget Amount:</label>
                                    <input
                                        type="text"
                                        className="bg-white-light w-full py-1 px-2 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                        value={budgetAmount}
                                        onChange={(event) => setBudgetAmount(event.target.value)}
                                    />
                                    <br />
                                    <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Add Budget</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div>{/* 2nd column */}
                        {budgets.length > 0 && (
                            <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                                <div className="flex items-center text-xl font-bold p-2.5">
                                    <span className="text-xl font-bold">Budget</span>
                                </div>
                                <div className="flex items-center text-xl justify-end font-bold text-right p-2.5">
                                    <span className="text-right text-sm">Budget Amount: {formattedBalance.format(totalBudgetAmount)}</span>
                                </div>
                                <div className="text-xs">
                                    <div className="grid grid-cols-2 gap-2">
                                        {budgetSummary.map((budget, index) => (
                                            <div

                                                key={budget.name}
                                                className={`border-2 border-blue-300 rounded-lg p-4 relative ${budgetSummary.length % 2 === 1 && index === budgetSummary.length - 1 ? 'col-span-2' : ''}`}
                                            >
                                                <button
                                                    onClick={() => deleteBudget(budget.name)}
                                                    className="text-red-500 font-bold top-2 right-2 absolute"
                                                >
                                                    x
                                                </button>
                                                <h2 className="font-bold text-xl mb-2">{budget.name}</h2>

                                                <p className="font-semibold text-right">Total Amount: {formattedBalance.format(budget.totalAmount.toFixed(2))}</p>
                                                {/* <p className="font-semibold text-right">Spent Amount: {formattedBalance.format(budget.spentAmount.toFixed(2))}</p> */}

                                                <table className="min-w-full mt-2">
                                                    <thead>
                                                        <tr>
                                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categorizedExpenses[budget.name]?.map((expense, index) => (
                                                            <tr key={index}>
                                                                <td className="px-3 py-2">{expense.description}</td>
                                                                <td className="px-3 py-2 text-right">{formattedBalance.format(expense.cost.toFixed(2))}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <p className="font-semibold text-right mt-2">Remaining Amount: {formattedBalance.format(budget.remainingAmount.toFixed(2))}</p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div className="flex items-center text-xl justify-end font-bold text-right p-2.5">
                                    <span className="text-right text-sm">Remaining Amount: {formattedBalance.format(totalRemainingAmount)}</span>
                                </div>
                            </div>
                        )}
                        {recentExpenses.length > 0 && (
                            <div>
                                <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8 mt-5">
                                    <div className="flex text-xl font-bold p-2.5"><span className="text-xl font-bold">Expenses</span></div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {recentExpenses.map((expense, index) => (
                                            <div key={index} className="bg-white-100 rounded-xl p-4 shadow-md">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <div className="text-sm font-bold">{expense.description}</div>
                                                        <div className="text-xs text-gray-500">{new Date(expense.date).toLocaleString()}</div>
                                                    </div>
                                                    <div className="text-sm font-bold">{formattedBalance.format(expense.cost)}</div>
                                                </div>
                                                <div className="text-xs text-gray-500">{expense.category}</div>
                                                <button className="text-xs text-red-500 mt-2" onClick={() => deleteExpense(index)}>Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <div className="text-xs text-left">
                <ToastContainer />
            </div>
        </div>
    );
}