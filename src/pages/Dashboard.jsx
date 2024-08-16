import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
    const [user, setUser] = useState("");

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setUser(loggedInUser);
    }, []);

    // const formattedBalance = user ? user.balance.toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'PHP',
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    // }) : ''; //fallback value in case there are any issues with the value provided (case where the user is not properly loaded)

    // const handleGreetings = (event) => {

    //     event.preventDefault();
    //     if (user.name != null) {

    //     }
    // }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="greeting">
                Good day, {user.name}!
            </div>
            <ToastContainer />
        </div>
    )
}