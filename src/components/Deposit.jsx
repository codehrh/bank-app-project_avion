import { useState, useEffect } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from "react-toastify";


const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function Deposit() {
    const [users, setUsers] = useState(data.filter(user => user.type === 'user'));
    const [show, setShow] = useState(false); // flag to hide or show elements
    const [user, setUser] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("withdraw");
    const [loggedInUser, setLoggedInUser] = useState(null);



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
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    return (

        <div className="">
            <div className=""><span className="font-bold text-lg">Deposit</span></div>
            <form className="flex flex-col items-start text-sm " onSubmit={(event) => {
                event.preventDefault();
                handleTransaction();
            }}>
                <div className="mx-1 mt-2">Account Name :</div>
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
                <div className="mx-1">Amount: </div>
                <input
                    type="text"
                    value={amount}
                    className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                    onChange={(event) => setAmount(event.target.value)}
                ></input>{" "}
                <br />
                <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2 mt-5" type="submit">Deposit</button>
            </form>
            <ToastContainer />
        </div>
    );
}