import React, { useState } from "react";
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
    const [expenseCategory, setExpenseCategory] = useState("");
    const filteredUsers = users.filter(u => u.type === "user");

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const currentUser = users.find(u => u.username === loggedInUser?.username);

    if (!currentUser) {
        return <div>No user data found. Please log in again.</div>;
    }

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
        toast.success(`${expenseDescription} has been added to Expenses`);

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

    const categories = ['Necessities', 'Leisure', 'Miscellaneous'];
    const categorizedExpenses = categories.reduce((acc, category) => {
        acc[category] = (currentUser.expenses || []).filter(expense => expense.category === category);
        return acc;
    }, {});

    // Get the most recent expenses (sorted by the most recent first)
    const recentExpenses = [...(currentUser.expenses || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="max-w-[1200px] bg-slate-100 p-5 rounded-2xl shadow-2xl">
            {/* User Info Section */}
            <div className="mb-4 p-4 border-b border-gray-300">
                <div className="text-xl font-semibold">
                    {currentUser.firstname} {currentUser.lastname}
                </div>
                <div className="text-lg">
                    Balance: {formattedBalance.format(currentUser.balance.toFixed(2))}
                </div>
            </div>

            {/* Expenses Section */}
            <div>
                <button className="bg-gradient-to-r m-1 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" onClick={() => setShow(!show)}>
                    {show ? "Hide Form" : "Add Expense"}
                </button>

                {show && (
                    <div>
                        <form className="flex flex-col items-center" onSubmit={(event) => {
                            event.preventDefault();
                            addExpense();
                        }}>
                            <label>Expense Description:</label>
                            <input
                                type="text"
                                value={expenseDescription}
                                className="bg-white-light py-1 px-2 m-1 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                onChange={(event) => setExpenseDescription(event.target.value)}
                            />
                            <br />
                            <label>Expense Amount:</label>
                            <input
                                type="text"
                                className="bg-white-light py-1 px-2 m-1 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                value={expenseAmount}
                                onChange={(event) => setExpenseAmount(event.target.value)}
                            />
                            <br />
                            <label>Expense Category:</label>
                            <select
                                value={expenseCategory}
                                className="w-40 bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                onChange={(event) => setExpenseCategory(event.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Necessities">Necessities</option>
                                <option value="Leisure">Leisure</option>
                                <option value="Miscellaneous">Miscellaneous</option>
                            </select>
                            <br />
                            <button className="bg-gradient-to-r m-1 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" type="submit">Add Expense</button>
                        </form>
                    </div>
                )}

                {/* Display categorized expenses */}
                <div className="flex flex-wrap">
                    {categories.map(category => (
                        <div key={category} className="m-4 p-4 border border-gray-300 rounded-lg shadow-lg w-full sm:w-1/3">
                            <h2 className="font-bold text-xl mb-2">{category}</h2>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categorizedExpenses[category].map((expense, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formattedBalance.format(expense.cost.toFixed(2))}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>

                {/* Display recent expenses */}
                <div className="m-4 p-4 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="font-bold text-xl mb-2">Most Recent Transactions</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentExpenses.map((expense, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formattedBalance.format(expense.cost.toFixed(2))}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className="bg-gradient-to-r from-red-400 to-red-200 text-white font-semibold rounded-full py-1 px-3"
                                            onClick={() => deleteExpense(currentUser.expenses.findIndex(e => e === expense))}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}