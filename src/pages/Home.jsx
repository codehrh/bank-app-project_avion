import Logo from "../components/Logo/Logo.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import DefaultSidebar from "../layouts/DefaultSidebar.jsx";


//Unused import
// import BudgetApp from "../BudgetApp/BudgetApp.jsx";

//rr import
import { Outlet } from "react-router";

export default function Home() {
    return (
        <div className="MainContainer">   <div className="nav">
            <div className="leftnav">
            </div>
            <div className="rightnav">
            </div>
        </div>

            <div className="mainContainer">
                <div className="leftContainer">
                    <DefaultSidebar />
                </div>
                <div className="rightContainer">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}