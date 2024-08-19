import { useState, useEffect } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});


export default function MyAccount() {
    const [loggedInUser, setLoggedInUser] = useState(null); // Separate state for logged-in user

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
        <div>
            <div className="flex-col items-start min-w-[165vmin] bg-slate-40 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5 mt-20 ml-14">
                <div className="flex text-xl font-bold p-2.5">My Account</div>
                <div className="text-sm p-2 flex flex-col item-start">
                    <div className="text-right"><span className="font-bold">Account Balance : </span>{formattedBalance.format(loggedInUser?.balance)}</div>
                    <div className="font-bold text-2xl my-4">{loggedInUser?.firstname} {loggedInUser?.lastname}</div>
                    <table >
                        <tr>
                            <td className="font-bold">Username</td>
                            <td>{loggedInUser?.username}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Email </td>
                            <td>{loggedInUser?.email}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Type </td>
                            <td>{loggedInUser?.type}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}