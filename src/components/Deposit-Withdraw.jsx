import { useState } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from "react-toastify";




export default function MoneyTransfer() {
    const [users, setUsers] = useState(data);
    const [show, setShow] = useState(false); // flag to hide or show elements
    const [user, setUser] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("withdraw");



    const userExist = (name) => {
        return users.find(user => user.name === name);
    }

    const findUser = (name) => {
        let foundUser = users.filter((user) => user.name === name);
        return foundUser[0];
    }

    const handleTransaction = () => {
        const newAmount = Number(amount);
        if (
            userExist(user) &&
            newAmount > 0
        ) {
            const userInfo = findUser(user);
            const updateUsers = users.map((u) => {
                if (u.name === user) {
                    if (transactionType === "withdraw") {
                        if (u.balance >= newAmount) {
                            toast.success(`${amount} has been widthrawn successfully!`)
                            return { ...u, balance: u.balance - newAmount };
                        } else {
                            toast.error("Not enough balance");
                            return u;
                        }
                    } else if (transactionType === "deposit") {
                        toast.success(`${amount} has been deposited successfully!`)
                        return { ...u, balance: u.balance + newAmount };
                    }
                }
                return u;
            });
            setUsers(updateUsers);

        } else {
            toast.error("Transaction Invalid");
        }
        setUser("");
        setAmount("");
        setShow(false);
    };

    return (
        <div className="max-w-[600px] bg-slate-100 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5">
            <div className="moneyTransfer">
                {
                    <div>
                        {users.map((user) => {
                            return (

                                <div key={user.id}>
                                    {user.name} - {user.balance}
                                </div>
                            );
                        })}
                        <button onClick={() => setShow(!show)}>
                            {show ? "Hide Form" : "Show Form"}{/* show is inversely proportional to value - if show is true, value is false; if show is false, the value is true */}
                        </button>
                    </div>
                }
                {show && (
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleTransaction();
                    }}>
                        <label>User:</label>
                        <input
                            type="text"
                            value={user}
                            onChange={(event) => setUser(event.target.value)}
                        ></input>{" "}
                        <br />
                        <label>Amount:</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        ></input>{" "}
                        <br />
                        <label>Transaction Type:</label>
                        <select
                            value={transactionType}
                            onChange={(event) => setTransactionType(event.target.value)}
                        >
                            <option value="withdraw">Withdraw</option>
                            <option value="deposit">Deposit</option>
                        </select>{" "}
                        <br />
                        <button type="submit">Confirm Transaction</button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}