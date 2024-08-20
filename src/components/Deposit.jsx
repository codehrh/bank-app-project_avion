import { useState, useEffect } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function Deposit() {
    const [users, setUsers] = useState(data.filter(user => user.type === 'User'));
    const [show, setShow] = useState(false);
    const [user, setUser] = useState("");
    const [amount, setAmount] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const findUser = (username) => {
        return users.find(user => user.username === username);
    }

    const handleTransaction = () => {
        const newAmount = Number(amount);
        const userInfo = findUser(user);

        if (userInfo && newAmount > 0) {
            const updatedUsers = users.map(u => {
                if (u.username === user) {
                    toast.success(`${formattedBalance.format(newAmount)} has been deposited successfully!`);
                    return { ...u, balance: u.balance + newAmount };
                }
                return u;
            });
            setUsers(updatedUsers);
        } else {
            toast.error("Transaction Invalid");
        }
        setUser("");
        setAmount("");
        setShow(false);
    };

    return (
        <div>
            <div><span className="font-bold text-lg">Deposit</span></div>
            <form className="flex flex-col items-start text-sm" onSubmit={(event) => {
                event.preventDefault();
                handleTransaction();
            }}>
                <div className="mx-1 mt-2">Account Name:</div>
                <select
                    value={user}
                    className="w-full bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    onChange={(event) => setUser(event.target.value)}
                >
                    <option value="">Select Account</option>
                    {users.map(u => (
                        <option key={u.username} value={u.username}>
                            {u.firstname} {u.lastname}
                        </option>
                    ))}
                </select>
                <br />
                <div className="mx-1">Amount:</div>
                <input
                    type="number"
                    value={amount}
                    className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                    onChange={(event) => setAmount(event.target.value)}
                />
                <br />
                <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Deposit</button>
            </form>
            <ToastContainer />
        </div>
    );
}