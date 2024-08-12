import "./RootLayout.css";
import { NavLink } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <NavLink className="item" to="/Home">
                        Home
                    </NavLink>
                    <NavLink className="item" to="Transactions">
                        Transaction
                    </NavLink>
                    <NavLink className="item" to="about">
                        About
                    </NavLink>
                </nav>
            </header>
        </div>
    );
}