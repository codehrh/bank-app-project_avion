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
    const [users, setUsers] = useState(data);
    const [show, setShow] = useState(false); // flag to hide or show elements
    const [user, setUser] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");

    const userExist = (name) => {
        return users.find(user => user.name === name);
    }

    const findUser = (name) => {
        return users.find(user => user.name === name);
    }

    const addExpense = () => {
        const expenseCost = Number(expenseAmount);
        if (userExist(user) && expenseDescription && expenseCost > 0) {
            const updatedUsers = users.map((u) => {
                if (u.name === user) {
                    return {
                        ...u,
                        balance: u.balance - expenseCost,
                        expenses: [...(u.expenses || []), { description: expenseDescription, cost: expenseCost }]
                    };
                }
                return u;
            });
            setUsers(updatedUsers);
            toast.success(`${expenseDescription} has been added to Expenses`);
        } else {
            toast.error("Invalid Expense or User");
        }
        setExpenseDescription("");
        setExpenseAmount("");
        setShow(false);
    };

    const deleteExpense = (userName, index) => {
        const updatedUsers = users.map((u) => {
            if (u.name === userName) {
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
        toast.success(`${expenseDescription} successfully deleted to Expenses`);
    };

    return (
        <div className="max-w-[600px] bg-slate-100 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5">
            <div className="">
                <div>
                    {users.map((u) => (
                        <div key={u.id}>
                            <div>{u.name} - Balance: {formattedBalance.format(u.balance.toFixed(2))}</div>
                            <ul>
                                {u.expenses && u.expenses.map((expense, index) => (
                                    <li key={index}>
                                        {expense.description}: Php{expense.cost.toFixed(2)}
                                        <button className="bg-gradient-to-r m-1 from-blue-400 to-cyan-200 w-20 font-semibold rounded-full py-1" onClick={() => deleteExpense(u.name, index)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <button className="bg-gradient-to-r m-1 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" onClick={() => setShow(!show)}>
                    {show ? "Hide Form" : "Add Expense"}
                </button>

                {show && (
                    <div>
                        <form className="flex flex-col items-center" onSubmit={(event) => {
                            event.preventDefault();
                            addExpense();
                        }}>
                            <div>User:</div>
                            <select
                                value={user}
                                className="w-40 bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"

                                onChange={(event) => setUser(event.target.value)}
                            >
                                <option value="">Select User</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.name}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <label >Expense Description:</label>
                            <input
                                type="text"
                                value={expenseDescription}
                                className="bg-white-light py-1 px-2 m-1 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                onChange={(event) => setExpenseDescription(event.target.value)}
                            />
                            <br />
                            <label >Expense Amount:</label>
                            <input
                                type="text"
                                className="bg-white-light py-1 px-2 m-1 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                value={expenseAmount}
                                onChange={(event) => setExpenseAmount(event.target.value)}
                            />
                            <br />
                            <button className="bg-gradient-to-r m-1 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" type="submit">Add Expense</button>
                        </form>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}