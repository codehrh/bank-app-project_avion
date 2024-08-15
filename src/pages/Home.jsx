<<<<<<< HEAD
import Logo from "../components/Logo/Logo.jsx";
=======
import SearchBar from "../components/SearchBar.jsx";
import Logo from "../components/Logo.jsx";
>>>>>>> 3cf4887c8e7507ca7f01e70ba90d46268b434726
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