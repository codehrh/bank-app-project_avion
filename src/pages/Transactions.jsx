import deposit from "../assets/images/deposit.png";
import withdraw from "../assets/images/withdraw.png";
import data from "../assets/data/bankUsers.json";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function Transactions() {
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);
    const [users, setUsers] = useState(data.filter(user => user.type === 'user'));
    const [transactions, setTransactions] = useState([]);
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        console.log(users); // This should show an array of user objects
    }, [users]);

    // Handle deposit transactions
    const handleDeposit = () => {
        const newAmount = Number(depositAmount);
        if (!selectedUser || newAmount <= 0) {
            toast.error("Deposit Invalid");
            return;
        }

        const userInfo = findUser(selectedUser);
        if (!userInfo) {
            toast.error("User does not exist");
            return;
        }

        const updatedUsers = users.map((u) => {
            if (u.name === selectedUser) {
                toast.success(`${depositAmount} has been deposited successfully!`);
                setTransactions([...transactions, { user: selectedUser, type: 'Deposit', amount: formattedBalance.format(newAmount), date: new Date().toLocaleString() }]);
                return { ...u, balance: u.balance + newAmount };
            }
            return u;
        });

        setUsers(updatedUsers);
        setDepositAmount("");
        setSelectedUser("");
        setShowDepositForm(false);
    };

    // Handle withdrawal transactions
    const handleWithdraw = () => {
        const newAmount = Number(withdrawAmount);
        if (!selectedUser || newAmount <= 0) {
            toast.error("Withdrawal Invalid");
            return;
        }

        const userInfo = findUser(selectedUser);
        if (!userInfo) {
            toast.error("User does not exist");
            return;
        }

        const updatedUsers = users.map((u) => {
            if (u.name === selectedUser) {
                if (u.balance >= newAmount) {
                    toast.success(`${withdrawAmount} has been withdrawn successfully!`);
                    setTransactions([...transactions, { user: selectedUser, type: 'Withdraw', amount: formattedBalance.format(newAmount), date: new Date().toLocaleString() }]);
                    return { ...u, balance: u.balance - newAmount };
                } else {
                    toast.error("Not enough balance");
                }
            }
            return u;
        });

        setUsers(updatedUsers);
        setWithdrawAmount("");
        setSelectedUser("");
        setShowWithdrawForm(false);
    };

    // Find user by name
    const findUser = (name) => {
        return users.find(user => user.name === name);
    };

    return (
        <div className="min-w-[165vmin] text-xl p-2.5 ml-14 mr-14 mt-20">
            <div className="font-bold ml-5">Transactions</div>
            <div className="grid grid-cols-2 gap-8 mt-5">
                <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                    <div className="flex text-xl font-bold p-2">
                        {!showDepositForm ? (
                            <img
                                src={deposit}
                                alt="Deposit"
                                onClick={() => setShowDepositForm(true)}
                                className="cursor-pointer"
                            />
                        ) : (
                            <div className="relative w-full">
                                <button
                                    onClick={() => setShowDepositForm(false)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                >
                                    X
                                </button>
                                <div className="">
                                    <div className=""><span className="font-bold text-lg">Deposit</span></div>
                                    <form className="flex flex-col items-start text-sm" onSubmit={(event) => {
                                        event.preventDefault();
                                        handleDeposit();
                                    }}>
                                        <div className="mx-1 mt-2">Account Name: </div>
                                        <select
                                            value={selectedUser}
                                            className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                            onChange={(event) => setSelectedUser(event.target.value)}
                                        >
                                            <option value="">Select Account</option>
                                            {users.map((u) => (
                                                <option key={u.id} value={u.id} >
                                                    {u.firstname} {u.lastname}
                                                </option>
                                            ))}
                                        </select>
                                        <br />
                                        <div className="mx-1">Amount: </div>
                                        <input
                                            type="text"
                                            value={depositAmount}
                                            className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                            onChange={(event) => setDepositAmount(event.target.value)}
                                        />
                                        <br />
                                        <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Deposit</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                    <div className="flex text-xl font-bold p-2">
                        {!showWithdrawForm ? (
                            <img
                                src={withdraw}
                                alt="Withdraw"
                                onClick={() => setShowWithdrawForm(true)}
                                className="cursor-pointer"
                            />
                        ) : (
                            <div className="relative w-full">
                                <button
                                    onClick={() => setShowWithdrawForm(false)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                >
                                    X
                                </button>
                                <div className="">
                                    <div className=""><span className="font-bold text-lg">Withdraw</span></div>
                                    <form className="flex flex-col items-start text-sm" onSubmit={(event) => {
                                        event.preventDefault();
                                        handleWithdraw();
                                    }}>
                                        <div className="mx-1 mt-2">Account Name: </div>
                                        <select
                                            value={selectedUser}
                                            className="w-40 bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                            onChange={(event) => setSelectedUser(event.target.value)}
                                        >
                                            <option value="">Select Account</option>
                                            {users.map((u) => (
                                                <option key={u.id} value={u.firstname}>
                                                    {u.firstname} {u.lastname}
                                                </option>
                                            ))}
                                        </select>
                                        <br />
                                        <div className="mx-1">Amount: </div>
                                        <input
                                            type="text"
                                            value={withdrawAmount}
                                            className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                            onChange={(event) => setWithdrawAmount(event.target.value)}
                                        />
                                        <br />
                                        <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Withdraw</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5">
                <div className="flex text-lg p-2">
                    <span className="font-bold">Recent Activity</span>
                </div>
                <table className="text-sm p-6 min-w-[100%]">
                    <thead>
                        <tr>
                            <th className="p-2.5">Activity</th>
                            <th className="p-2.5">Type</th>
                            <th className="p-2.5">Time and Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td className="p-2.5" colSpan="3">No transactions</td>
                            </tr>
                        ) : (
                            transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="p-2.5">{transaction.user}</td>
                                    <td className="p-2.5">{transaction.type}</td>
                                    <td className="p-2.5">{transaction.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}
