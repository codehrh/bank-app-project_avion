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
                            <h3>{u.name} - Balance: {formattedBalance.format(u.balance.toFixed(2))}</h3>
                            <ul>
                                {u.expenses && u.expenses.map((expense, index) => (
                                    <li key={index}>
                                        {expense.description}: ${expense.cost.toFixed(2)}
                                        <button onClick={() => deleteExpense(u.name, index)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <button onClick={() => setShow(!show)}>
                    {show ? "Hide Form" : "Add Expense"}
                </button>

                {show && (
                    <div>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            addExpense();
                        }}>
                            <label>User:</label>
                            <input
                                type="text"
                                value={user}
                                onChange={(event) => setUser(event.target.value)}
                            />
                            <br />
                            <label>Expense Description:</label>
                            <input
                                type="text"
                                value={expenseDescription}
                                onChange={(event) => setExpenseDescription(event.target.value)}
                            />
                            <br />
                            <label>Expense Amount:</label>
                            <input
                                type="text"
                                value={expenseAmount}
                                onChange={(event) => setExpenseAmount(event.target.value)}
                            />
                            <br />
                            <button type="submit">Add Expense</button>
                        </form>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}