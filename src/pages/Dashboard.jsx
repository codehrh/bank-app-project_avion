import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from "../assets/data/bankUsers.json";

export default function Dashboard() {
    const [user, setUser] = useState(data);


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
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setUser(loggedInUser);
    }, []);

    const formattedBalance = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });


    return (
        <div className="">
            <div className="min-w-[165vmin] bg-slate-100 items-center gap-20 p-8 rounded-2xl shadow-2xl p-2.5 mt-20 ml-14">
                <div className="text-3xl">Welcome Back, <span className="font-bold">{user.firstname}</span>!</div>
                <div className="text-xs">You last login at <span>{currentDate} {currentTime}</span></div>
            </div>
            <div className="min-w-[165vmin] bg-slate-100 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5 mt-5 ml-14">
                <div className="text-xl">Accounts</div>
                <div className="text-xs">
                    <table className="p-6 divide-y divide-slate-200 ">
                        <thead className="">
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Current Balance</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                user.map((user) =>
                                    <tr className="odd:bg-white even:bg-slate-50">
                                        <td className="p-2.5">{user.firstname} {user.lastname}</td>
                                        <td className="p-2.5">{user.username}</td>
                                        <td className="p-2.5">{user.email}</td>
                                        <td className="p-2.5">{formattedBalance.format(user.balance)}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}