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
    const [users, setUsers] = useState(data);
    const [show, setShow] = useState(false);
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");

    const getFilteredUsers = (excludeUser) => {
        return users.filter(user => user.name !== excludeUser);
    }

    const userExist = (name) => {
        return users.find(user => user.name === name);
    }

    const findUser = (name) => {
        let foundUser = users.filter((user) => user.name === name);
        return foundUser[0];
    }

    const transferMoney = () => {
        const newAmount = Number(amount);
        if (
            userExist(sender) &&
            userExist(receiver) &&
            sender !== receiver &&
            newAmount > 0
        ) {
            const senderInfo = findUser(sender);
            if (senderInfo.balance >= newAmount) {
                const updateUsers = users.map((user) => {
                    if (user.name === sender) {
                        return { ...user, balance: user.balance - newAmount };

                    } else if (user.name === receiver) {
                        return { ...user, balance: user.balance + newAmount };

                    }
                    return user;
                });
                setUsers(updateUsers);
                toast.success(`Php${amount} has been transfered Successfully to ${receiver}`);
            } else {
                toast.error("Not Enough Balance");
            }
        } else {
            if (!sender) {
                toast.error("Select a sender");
            }
            if (!receiver) {
                toast.error("Select a receiver");
            }
            if (!amount) {
                toast.error("Enter an amount");
            }
            else {
                toast.error("Transaction Invalid");
            }

        }
        setSender("");
        setReceiver("");
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
                        <button className="bg-gradient-to-r m-3 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" onClick={() => setShow(show ? false : true)}>
                            Transfer{/* show is inversely proportional to value - if show is true, value is false; if show is false, the value is true */}
                        </button>
                    </div>
                }
                {show && (
                    <form onSubmit={transferMoney} className="flex flex-col items-center">
                        <div>Sender:</div>
                        <select
                            value={sender}
                            className="w-40 bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            onChange={(event) => setSender(event.target.value)}
                        >
                            <option value="">Select Sender</option>
                            {getFilteredUsers(receiver).map(user => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <br />
                        <div>Receiver: </div>
                        <select
                            value={receiver}
                            className="w-40 bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            onChange={(event) => setReceiver(event.target.value)}
                        >
                            <option value="">Select Receiver</option>
                            {getFilteredUsers(sender).map(user => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <br />
                        <div>Amount: </div>
                        <input
                            type="value"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            className="bg-white-light py-1 px-2 m-1 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                            min="0"
                        />
                        <br />
                        <button className="bg-gradient-to-r m-1 from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-1" type="submit">Confirm Transfer</button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div >
    );
}