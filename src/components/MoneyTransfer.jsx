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
            toast.error("Transaction Invalid");
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
                        <button onClick={() => setShow(show ? false : true)}>
                            Transfer{/* show is inversely proportional to value - if show is true, value is false; if show is false, the value is true */}
                        </button>
                    </div>
                }
                {show && (
                    <form onSubmit={transferMoney}>
                        <label>Sender:</label>
                        <select
                            value={sender}
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
                        <label>Receiver:</label>
                        <select
                            value={receiver}
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
                        <label>Amount:</label>
                        <input
                            type="value"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            min="0"
                        />
                        <br />
                        <button type="submit">Confirm Transfer</button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}