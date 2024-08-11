import "./RootLayout.css";
import { NavLink } from "react-router-dom";

function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <NavLink className="item" to="/Home">
                        Home
                    </NavLink>
                    <NavLink className="item" to="transactions">
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

export default RootLayout;