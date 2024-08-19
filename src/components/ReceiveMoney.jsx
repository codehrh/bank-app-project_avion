import { useState, useEffect } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from "react-toastify";

const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function ReceiveMoney() {
    const [users, setUsers] = useState(data);
    const [sender, setSender] = useState(""); 
    const [amount, setAmount] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);

    
    const getFilteredUsers = () => {
        return users.filter(user => user.type === "User" && user.username !== loggedInUser?.username); 
    }

    const userExist = (username) => { 
        return users.find(user => user.username === username);
    }

    const findUser = (username) => { 
        return users.find(user => user.username === username);
    }

    const transferMoney = () => {
        const newAmount = Number(amount);
        if (
            loggedInUser &&
            userExist(sender) &&
            sender !== loggedInUser.username &&
            newAmount > 0
        ) {
            const senderInfo = findUser(sender); 
            if (senderInfo.balance >= newAmount) {
                const updateUsers = users.map((user) => {
                    if (user.username === sender) { 
                        return { ...user, balance: user.balance - newAmount };

                    } else if (user.username === loggedInUser.username) { 
                        return { ...user, balance: user.balance + newAmount };

                    }
                    return user;
                });
                setUsers(updateUsers);
                toast.success(`Php${amount} has been transferred successfully from ${sender} to you`);
            } else {
                toast.error("Not enough balance");
            }
        } else {
            if (!sender) {
                toast.error("Select a sender");
            }
            if (!amount) {
                toast.error("Enter an amount");
            } else {
                toast.error("Transaction invalid");
            }
        }
        setSender("");
        setAmount("");
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
            <div className=""><span className="font-bold text-lg">Receive Money</span></div>
            <form onSubmit={(e) => { e.preventDefault(); transferMoney(); }} className="flex flex-col items-start text-sm p-1">
                <div>
                    <div className="mx-1 mb-2">Account Name: {loggedInUser?.firstname} {loggedInUser?.lastname}</div>
                    <div className="mx-1 mb-2">Balance: {loggedInUser ? formattedBalance.format(loggedInUser.balance) : "N/A"}</div>
                </div>
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
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                    min="0"
                />
                <br />
                <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Confirm</button>
            </form>
            <ToastContainer />
        </div>
    );
}