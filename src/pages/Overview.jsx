import { useState, useEffect } from "react";

export default function Overview(){
    const [user, setUser] = useState("");

    useEffect (() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setUser(loggedInUser);
    }, []);

    const formattedBalance = user ? user.balance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) : ''; //fallback value in case there are any issues with the value provided (case where the user is not properly loaded)

    return (
        <div className="overview">
            <div className="greeting">
                Hello there, {user.name}!
            </div>
            <div className="balance">
                Your balance is {formattedBalance}
            </div>
        </div>
    )
}