import sendbtn from "../assets/images/send.png";
import receivebtn from "../assets/images/receive.png";
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

export default function UserTransactions() {
    const [showSendForm, setShowSendForm] = useState(false);
    const [showReceiveForm, setShowReceiveForm] = useState(false);
    const [users, setUsers] = useState(data);
    const [receiver, setReceiver] = useState("");
    const [sender, setSender] = useState("");
    const [sendAmount, setSendAmount] = useState("");
    const [receiveAmount, setReceiveAmount] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const getFilteredUsers = () => {
        return users.filter(user => user.type === "User" && user.username !== loggedInUser?.username);
    };

    const findUser = (username) => {
        return users.find(user => user.username === username);
    };

    const transferMoney = (isSend) => {
        const amount = isSend ? Number(sendAmount) : Number(receiveAmount);
        const targetUser = isSend ? receiver : sender;

        // Validation: Check if a user is selected
        if (!targetUser) {
            toast.error("Please select a valid user.");
            return;
        }

        // Validation: Check if the amount is positive and non-zero
        if (amount <= 0) {
            toast.error("Amount must be a positive number greater than zero.");
            return;
        }

        const senderInfo = isSend ? loggedInUser : findUser(sender);
        const receiverInfo = isSend ? findUser(receiver) : loggedInUser;

        // Validation: Check if sender has sufficient balance
        if (isSend && senderInfo.balance < amount) {
            toast.error("Insufficient balance to complete the transaction.");
            return;
        }

        // Validation: Check if sender and receiver are valid users
        if (!senderInfo || !receiverInfo) {
            toast.error("Invalid sender or receiver. Please try again.");
            return;
        }

        // Update the users' balances
        const updatedUsers = users.map((user) => {
            if (user.username === senderInfo.username) {
                return { ...user, balance: user.balance - amount };
            } else if (user.username === receiverInfo.username) {
                return { ...user, balance: user.balance + amount };
            }
            return user;
        });

        // Update the state with the new balances
        setUsers(updatedUsers);

        // Add transaction to history
        const newTransaction = {
            type: isSend ? "Sent" : "Received",
            amount: amount.toFixed(2),
            from: isSend ? loggedInUser.username : receiverInfo.username,
            to: isSend ? receiverInfo.username : loggedInUser.username,
            date: new Date().toLocaleString(),
        };
        setTransactions([newTransaction, ...transactions]);

        toast.success(`Php${amount.toFixed(2)} has been successfully ${isSend ? "sent" : "received"}!`);

        // Reset form fields
        setSendAmount("");
        setReceiveAmount("");
        setReceiver("");
        setSender("");
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            const updatedUser = users.find(user => user.username === loggedInUser.username);
            if (updatedUser) {
                setLoggedInUser(updatedUser);
            }
        }
    }, [users, loggedInUser]);

    return (
        <div className="">
            <div className="min-w-[165vmin] text-xl p-2.5 ml-14 mr-14 mt-20">
                <div className="font-bold ml-5">Transactions</div>
                <div className="text-right text-sm pr-2">
                    <span className="font-bold">Account Balance : </span>
                    {formattedBalance.format(loggedInUser?.balance)}
                </div>
                <div className="grid grid-cols-2 gap-8 mt-5">
                    {/* Send Money Section */}
                    <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                        <div className="flex text-xl font-bold p-2">
                            {!showSendForm ? (
                                <img
                                    src={sendbtn}
                                    alt="Send Money"
                                    onClick={() => setShowSendForm(true)}
                                    className="cursor-pointer"
                                />
                            ) : (
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setShowSendForm(false)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                    >
                                        X
                                    </button>
                                    <div>
                                        <div className=""><span className="font-bold text-lg">Send Money</span></div>
                                        <form onSubmit={(e) => { e.preventDefault(); transferMoney(true); }} className="flex flex-col items-start text-sm p-1">
                                            <div className="mx-1 mb-2">Account Name: {loggedInUser?.firstname} {loggedInUser?.lastname}</div>
                                            <div className="mx-1">Receiver's Name: </div>
                                            <select
                                                value={receiver}
                                                className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                onChange={(event) => setReceiver(event.target.value)}
                                            >
                                                <option value="">Select Receiver</option>
                                                {getFilteredUsers().map(user => (
                                                    <option key={user.username} value={user.username}>
                                                        {user.firstname} {user.lastname}
                                                    </option>
                                                ))}
                                            </select>
                                            <br />
                                            <div className="mx-1">Amount: </div>
                                            <input
                                                type="number"
                                                value={sendAmount}
                                                onChange={(event) => setSendAmount(event.target.value)}
                                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                                min="0"
                                            />
                                            <br />
                                            <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Confirm</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Receive Money Section */}
                    <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                        <div className="flex text-xl font-bold p-2">
                            {!showReceiveForm ? (
                                <img
                                    src={receivebtn}
                                    alt="Receive Money"
                                    onClick={() => setShowReceiveForm(true)}
                                    className="cursor-pointer"
                                />
                            ) : (
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setShowReceiveForm(false)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                    >
                                        X
                                    </button>
                                    <div>
                                        <div className=""><span className="font-bold text-lg">Receive Money</span></div>
                                        <form onSubmit={(e) => { e.preventDefault(); transferMoney(false); }} className="flex flex-col items-start text-sm p-1">
                                            <div className="mx-1 mb-2">Account Name: {loggedInUser?.firstname} {loggedInUser?.lastname}</div>
                                            <div className="mx-1">Sender's Name: </div>
                                            <select
                                                value={sender}
                                                className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                onChange={(event) => setSender(event.target.value)}
                                            >
                                                <option value="">Select Sender</option>
                                                {getFilteredUsers().map(user => (
                                                    <option key={user.username} value={user.username}>
                                                        {user.firstname} {user.lastname}
                                                    </option>
                                                ))}
                                            </select>
                                            <br />
                                            <div className="mx-1">Amount: </div>
                                            <input
                                                type="number"
                                                value={receiveAmount}
                                                onChange={(event) => setReceiveAmount(event.target.value)}
                                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                                min="0"
                                            />
                                            <br />
                                            <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Confirm</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5">
                    <div className="flex text-lg p-2"><span className="font-bold">Recent Activity</span></div>
                    <table className="text-sm p-6 min-w-[100%]">
                        <thead>
                            <tr>
                                <th className="p-2.5">Activity</th>
                                <th className="p-2.5">Type</th>
                                <th className="p-2.5">From</th>
                                <th className="p-2.5">To</th>
                                <th className="p-2.5">Amount</th>
                                <th className="p-2.5">Date and Time</th>
                            </tr>
                        </thead>
                        <tbody className="mt-2">
                            {transactions.length > 0 ? transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="p-2.5">Transaction</td>
                                    <td className="p-2.5">{transaction.type}</td>
                                    <td className="p-2.5">{transaction.from}</td>
                                    <td className="p-2.5">{transaction.to}</td>
                                    <td className="p-2.5">{formattedBalance.format(transaction.amount)}</td>
                                    <td className="p-2.5">{transaction.date}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="p-2.5 text-center">No recent activity</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
