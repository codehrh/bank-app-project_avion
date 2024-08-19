import sendbtn from "../assets/images/send.png";
import receivebtn from "../assets/images/receive.png";
import data from "../assets/data/bankUsers.json";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

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
    const [amount, setAmount] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [receiverInfo, setReceiverInfo] = useState(null);
    const [senderInfo, setSenderInfo] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(storedUser);
    }, []);

    useEffect(() => {
        if (receiver) {
            const user = findUser(receiver);
            setReceiverInfo(user);
        } else {
            setReceiverInfo(null);
        }
    }, [receiver]);

    useEffect(() => {
        if (sender) {
            const user = findUser(sender);
            setSenderInfo(user);
        } else {
            setSenderInfo(null);
        }
    }, [sender]);

    const getFilteredUsers = (excludeUser) => {
        console.log("Logged In User:", excludeUser);
        const filteredUsers = users.filter(user => user.name !== excludeUser);
        console.log("Filtered Users:", filteredUsers);
        return filteredUsers;
    }

    const userExists = (name) => {
        return users.some(user => user.name === name);
    }

    const findUser = (name) => {
        return users.find(user => user.name === name);
    }

    const updateBalances = (senderName, receiverName, amount) => {
        const newAmount = Number(amount);
        const updatedUsers = users.map(user => {
            if (user.name === senderName) {
                return { ...user, balance: user.balance - newAmount };
            } else if (user.name === receiverName) {
                return { ...user, balance: user.balance + newAmount };
            }
            return user;
        });
        setUsers(updatedUsers);
    }

    const handleSendMoney = (e) => {
        e.preventDefault();
        const newAmount = Number(amount);
        const senderName = loggedInUser.name;
        if (userExists(receiver) && senderName !== receiver && newAmount > 0) {
            const senderInfo = findUser(senderName);
            if (senderInfo.balance >= newAmount) {
                updateBalances(senderName, receiver, amount);
                toast.success(`Php${amount} has been transferred successfully to ${receiver}`);
            } else {
                toast.error("Not enough balance");
            }
        } else {
            if (!receiver) toast.error("Select a receiver");
            if (!amount) toast.error("Enter an amount");
            if (senderName === receiver) toast.error("Sender and receiver cannot be the same");
            if (amount <= 0) toast.error("Enter a valid amount");
        }
        setReceiver("");
        setAmount("");
    };

    const handleReceiveMoney = (e) => {
        e.preventDefault();
        const newAmount = Number(amount);
        const receiverName = loggedInUser.name;
        if (userExists(sender) && sender !== receiverName && newAmount > 0) {
            const senderInfo = findUser(sender);
            if (senderInfo.balance >= newAmount) {
                updateBalances(sender, receiverName, amount);
                toast.success(`Php${amount} has been received successfully from ${sender}`);
            } else {
                toast.error("Not enough balance");
            }
        } else {
            if (!sender) toast.error("Select a sender");
            if (!amount) toast.error("Enter an amount");
            if (sender === receiverName) toast.error("Sender and receiver cannot be the same");
            if (amount <= 0) toast.error("Enter a valid amount");
        }
        setSender("");
        setAmount("");
    };

    return (
        <div className="">
            <div className="min-w-[165vmin] text-xl p-2.5 ml-14 mr-14 mt-20">
                <div className="font-bold ml-5">Transactions</div>
                <div className="text-right text-sm pr-2">
                    <span className="font-bold">Account Balance : </span>
                    {formattedBalance.format(loggedInUser?.balance)}
                </div>
                <div className="grid grid-cols-2 gap-8 mt-5">
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
                                        <div className="font-bold text-lg">Send Money</div>
                                        <form onSubmit={handleSendMoney} className="flex flex-col text-sm p-1">
                                            <div className="mx-1 mb-2">
                                                Sender: {loggedInUser?.firstname} {loggedInUser?.lastname}
                                            </div>
                                            <div className="mx-1">Receiver's Name:</div>
                                            <select
                                                value={receiver}
                                                className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                onChange={(event) => setReceiver(event.target.value)}
                                            >
                                                <option value="">Select Receiver</option>
                                                {getFilteredUsers(loggedInUser?.name).map(user => (
                                                    <option key={user.name} value={user.name}>
                                                        {user.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {receiverInfo && (
                                                <div className="mt-2 text-sm">
                                                    <div><strong>Receiver Info:</strong></div>
                                                    <div>Name: {receiverInfo.name}</div>
                                                    <div>Balance: {formattedBalance.format(receiverInfo.balance)}</div>
                                                </div>
                                            )}
                                            <br />
                                            <div className="mx-1">Amount:</div>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(event) => setAmount(event.target.value)}
                                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                                min="0"
                                            />
                                            <br />
                                            <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">
                                                Send
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
                                        <div className="font-bold text-lg">Receive Money</div>
                                        <form onSubmit={handleReceiveMoney} className="flex flex-col items-start text-sm p-1">
                                            <div className="mx-1 mb-2">
                                                Receiver: {loggedInUser?.firstname} {loggedInUser?.lastname}
                                            </div>
                                            <div className="mx-1">Sender's Name:</div>
                                            <select
                                                value={sender}
                                                className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                onChange={(event) => setSender(event.target.value)}
                                            >
                                                <option value="">Select Sender</option>
                                                {getFilteredUsers(loggedInUser?.name).map(user => (
                                                    <option key={user.name} value={user.name}>
                                                        {user.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {senderInfo && (
                                                <div className="mt-2 text-sm">
                                                    <div><strong>Sender Info:</strong></div>
                                                    <div>Name: {senderInfo.name}</div>
                                                    <div>Balance: {formattedBalance.format(senderInfo.balance)}</div>
                                                </div>
                                            )}
                                            <br />
                                            <div className="mx-1">Amount:</div>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(event) => setAmount(event.target.value)}
                                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                                                min="0"
                                            />
                                            <br />
                                            <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">
                                                Receive
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5">
                    <div className="flex text-lg p-2"><span className="font-bold">Recent Activity</span></div>
                    <table className="text-sm p-6 min-w-[100%]">
                        <thead>
                            <tr>
                                <th className="p-2.5">Activity</th>
                                <th className="p-2.5">Type</th>
                                <th className="p-2.5">Time and Date</th>
                            </tr>
                        </thead>
                        <tbody className="mt-2">
                            <tr>
                                <td className="p-2.5">No recent activity</td>
                                <td className="p-2.5">N/A</td>
                                <td className="p-2.5">N/A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
