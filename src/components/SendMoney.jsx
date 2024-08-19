import { useState, useEffect } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from "react-toastify";


const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function SendMoney() {
    const [users, setUsers] = useState(data);
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);


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
    };
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setLoggedInUser(storedUser);
            setSender(storedUser.name); // Set the logged-in user as the sender
        }
    }, []);

    return (
        <div className="">
            <div className="font-bold text-lg" >Send Money</div>
            <form onSubmit={transferMoney} className="flex flex-col text-sm p-1">
                <div>
                    <div className="mx-1 mb-2">Account Name : {loggedInUser?.firstname} {loggedInUser?.lastname}</div>
                </div>

                <div className="mx-1">Receiver's Name : </div>
                <select
                    value={receiver}
                    className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    onChange={(event) => setReceiver(event.target.value)}
                >
                    <option value="">Select Receiver</option>
                    {getFilteredUsers(sender).map(user => (
                        <option key={user.name} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <br />
                <div className="mx-1">Amount: </div>
                <input
                    type="value"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                    min="0"
                />
                <br />
                <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Send</button>
            </form >
            <ToastContainer />
        </div >
    );
}