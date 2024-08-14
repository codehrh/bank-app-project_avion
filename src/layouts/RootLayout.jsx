import "./RootLayout.css";
import { NavLink } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <NavLink className="item" to="Overview">
                        Overview
                    </NavLink>
                    <NavLink className="item" to="Accounts">
                        Accounts
                    </NavLink>
                    <NavLink className="item" to="Transactions">
                        Transactions
                    </NavLink>
                    <NavLink className="item" to="MoneyTransfer">
                        Transfer
                    </NavLink>
                    <NavLink className="item" to="BudgetApp">
                        Budget App
                    </NavLink>
                </nav>
            </header>
        </div>
    );
}