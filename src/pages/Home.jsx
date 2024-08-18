import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultSidebar from "../layouts/DefaultSidebar.jsx";
import UserSidebar from "../layouts/UserSidebar.jsx";
import EmpSidebar from "../layouts/EmpSidebar.jsx";
import { useState, useEffect } from "react";



//Unused import
// import BudgetApp from "../BudgetApp/BudgetApp.jsx";

//rr import
import { Outlet } from "react-router";



export default function Home() {
    const [user, setUser] = useState("");

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setUser(loggedInUser);
    }, []);

    const renderSidebar = () => {
        if (user?.type === "user") {
            return <UserSidebar />;
        } else if (user?.type === "employee") {
            return <EmpSidebar />;
        }
    };

    return (

        < div className="mainContainer" >

            <div className="leftContainer">
                {renderSidebar()}
            </div>

            <div className="rightContainer">
                <body className="flex flex-col items-center justify-center h-screen bg-gradient-to-l from-sky-300 via-yellow-200 to-yellow-100">
                    <Outlet />
                </body>
            </div>
            <ToastContainer />
        </div >

    )
}