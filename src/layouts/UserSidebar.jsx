import Logo from "../DepositMoney.jsx/Logo";
import { RxDashboard } from "react-icons/rx";
import { IoCardSharp } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";



import bankLogo from "../assets/images/dinerobankicon.png";


const UserSidebar = () => {

    return (
        <div className="flex items-start justify-start fixed">
            <div className="h-[100vh] w-64 text-gray-600 text-[2.5vmin]">
                <div className="flex items-start gap-[20px] p-5 pl-8 justify-start ">
                    <NavLink
                        to="/Home"
                    >
                        <h1 className="homelogo">Dinero <img src={bankLogo} alt="logo" className="logo-img"></img> Bank</h1>
                    </NavLink>

                </div>
                <ul className="flex flex-col gap-10 p-5 pl-8 ">
                    <li className="">
                        <NavLink
                            to="UserDashboard"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <RxDashboard />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="MyAccount"

                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaUserCircle />
                                <span>My Account</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="UserTransactions"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaMoneyBillTransfer />
                                <span>Transactions</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="BudgetApp"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaPiggyBank />
                                <span>Budget App</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="fixed bottom-0">
                        <NavLink
                            to="/"
                        >
                            <div className="flex items-center gap-x-2 justify-start mb-10">
                                <MdOutlineLogout />
                                <span>Logout</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserSidebar;