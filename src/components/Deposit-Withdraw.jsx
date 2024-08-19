import { useState } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from "react-toastify";


const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function MoneyTransfer() {
    const [users, setUsers] = useState(data.filter(user => user.type === 'User'));
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
                                    {user.name} - {formattedBalance.format(user.balance)}
                                </div>
                            );
                        })}
                        <button className="bg-gradient-to-r m-3 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" onClick={() => setShow(!show)}>
                            {show ? "Hide Form" : "Show Form"}{/* show is inversely proportional to value - if show is true, value is false; if show is false, the value is true */}
                        </button>
                    </div>
                }
                {show && (

                    <form className="flex flex-col items-center" onSubmit={(event) => {
                        event.preventDefault();
                        handleTransaction();
                    }}>
                        <div>User: </div>
                        <select
                            value={user}
                            className="w-40 bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            onChange={(event) => setUser(event.target.value)}
                        >
                            <option value="">Select Account</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                        <br />
                        <div>Amount: </div>
                        <input
                            type="text"
                            value={amount}
                            className="bg-white-light py-1 px-2 m-1 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                            onChange={(event) => setAmount(event.target.value)}
                        ></input>{" "}
                        <br />
                        <div>Transaction Type: </div>
                        <select
                            value={transactionType}
                            className="w-40 bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            onChange={(event) => setTransactionType(event.target.value)}
                        >
                            <option value="withdraw">Withdraw</option>
                            <option value="deposit">Deposit</option>
                        </select>{" "}
                        <br />
                        <button className="bg-gradient-to-r m-1 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" type="submit">Confirm Transaction</button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}