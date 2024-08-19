import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultSidebar from "../layouts/DefaultSidebar.jsx";
import UserSidebar from "../layouts/UserSidebar.jsx";
import EmpSidebar from "../layouts/EmpSidebar.jsx";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";




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
        if (user?.type === "User") {
            return <UserSidebar />;
        } else if (user?.type === "Employee") {
            return <EmpSidebar />;
        }
    };

    return (

        < div className="min-h-screen flex" >

            <div className="leftContainer">
                {renderSidebar()}
            </div>

            <div className="rightContainer">
                <body className="bg-cover min-h-screen flex flex-col items-start justify-start text-left bg-gradient-to-l from-sky-300 via-yellow-200 to-yellow-100 pb-10">
                    <div className="absolute top-4 right-4 flex items-start">
                        <div><FaUserCircle size={33} color="#003566" /></div>
                        <div className="text-left pl-0.5 pr-1">
                            <div className="font-bold text-sm m-0 p-0">
                                {user.firstname} {user.lastname}
                            </div>
                            <div className="text-xs m-0 p-0 italic">
                                {user.type}
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </body>
            </div>
            <ToastContainer />
        </div >

    )
}