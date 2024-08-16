import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultSidebar from "../layouts/DefaultSidebar.jsx";


//Unused import
// import BudgetApp from "../BudgetApp/BudgetApp.jsx";

//rr import
import { Outlet } from "react-router";



export default function Home() {


    return (

        < div className="mainContainer" >
            <div className="leftContainer">
                <DefaultSidebar />
            </div>

            <div className="rightContainer">
                <body className="flex flex-col items-center justify-center h-screen bg-gradient-to-l from-sky-300 via-yellow-200 to-yellow-100">
                    <Outlet />
                    <ToastContainer />
                </body>
            </div>


        </div >

    )
}