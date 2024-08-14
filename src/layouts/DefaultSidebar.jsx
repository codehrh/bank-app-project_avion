import Logo from "../components/Logo/Logo";
import { RxDashboard } from "react-icons/rx";
import { IoCardSharp } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Sidebar = () => {


    return (
        <div className="flex items-start justify-start">
            <div className="h-[100vh] w-64 shadow-2xl text-gray-400 text-[18px]">
                <div className="flex items-start gap-[20px] p-4 justify-start">
                    <Logo />
                </div>
                <ul className="flex flex-col gap-14 p-4 mt-10">
                    <li className="transition-all duration-300">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <RxDashboard />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="transition-all duration-300">
                        <NavLink
                            to="/account"
                            className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <IoCardSharp />
                                <span>Account</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="transition-all duration-300">
                        <NavLink
                            to="/transactions"
                            className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <GrTransaction />
                                <span>Transactions</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="transition-all duration-300">
                        <NavLink
                            to="/transfer-money"
                            className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaMoneyBillTransfer />
                                <span>Transfer Money</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="transition-all duration-300">
                        <NavLink
                            to="/budget-app"
                            className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaMoneyBills />
                                <span>Budget App</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="transition-all duration-300">
                        <NavLink
                            to="/logout"
                            className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaUser />
                                <span>Logout</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;