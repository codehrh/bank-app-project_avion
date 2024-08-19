import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from "../assets/data/bankUsers.json";

export default function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(null); // Separate state for logged-in user
    const [users, setUsers] = useState(data.filter(user => user.type === 'User'));

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(storedUser);
    }, []);

    const formattedBalance = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="">
            <div className="min-w-[165vmin] bg-slate-40 items-center gap-20 p-8 rounded-2xl shadow-2xl p-2.5 mt-20 ml-14">
                <div className="text-3xl">Welcome Back, <span className="font-bold">{loggedInUser?.firstname}</span>!</div>
                <div className="text-xs">You last logged in on <span>{currentDate} {currentTime}</span></div>
            </div>
            <div className="min-w-[165vmin] bg-slate-40 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5 mt-5 ml-14">
                <div className="flex text-xl font-bold p-2.5">My Account</div>
                <div className="text-l p-2 flex flex-col item-start">
                    <div className="text-right"><span className="font-bold">Account Balance : </span>{formattedBalance.format(loggedInUser?.balance)}</div>
                    <div className="font-bold text-l">{loggedInUser?.firstname} {loggedInUser?.lastname}</div>
                    <div>{loggedInUser?.type}</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8  ml-14">
                <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5 ">
                    <div className="flex text-xl font-bold p-2">Recent Activity</div>
                </div>
                <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5">
                    <div className="flex text-xl font-bold p-2">Recent Expenses</div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}