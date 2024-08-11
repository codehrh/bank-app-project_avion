import SearchBar from "../SearchBar/SearchBar.jsx";
import Logo from "../Logo/Logo.jsx";
import RootLayout from "../../layouts/RootLayout.jsx";
import BudgetApp from "../BudgetApp/BudgetApp.jsx";

export default function MainContainer() {
    return (
        <div className="MainContainer">   <div className="nav">
            <div className="leftnav">
                <Logo></Logo>
            </div>
            <div className="rightnav">
                <SearchBar></SearchBar>
            </div>
        </div>

            <div className="mainContainer">
                <div className="leftContainer">
                    <RootLayout></RootLayout>
                </div>
                <div className="rightContainer">
                    <BudgetApp></BudgetApp>
                </div>
            </div>
        </div>
    )
}