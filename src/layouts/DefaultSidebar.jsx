import Logo from "../components/Logo";
import { RxDashboard } from "react-icons/rx";
import { IoCardSharp } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import bankLogo from "../assets/images/dinerobankicon.png";


const Sidebar = () => {


    return (
        <div className="flex items-start justify-start">
            <div className="h-[100vh] w-64 shadow-2xl text-gray-600 text-[2.5vmin]">
                <div className="flex items-start gap-[20px] p-5 pl-8 justify-start ">
                    <h1 className="homelogo">Dinero <img src={bankLogo} alt="logo" className="logo-img"></img> Bank</h1>
                </div>
                <ul className="flex flex-col gap-10 p-5 pl-8 ">
                    <li className="">
                        <NavLink
                            to="dashboard"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <RxDashboard />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="accounts"

                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <IoCardSharp />
                                <span>Account</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="transactions"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <GrTransaction />
                                <span>Transactions</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="TransferMoney"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaMoneyBillTransfer />
                                <span>Transfer Money</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="DepositWithdraw"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaMoneyBills />
                                <span>Deposit/Withdraw</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="BudgetApp"
                        >
                            <div className="flex items-center gap-x-2 justify-start">
                                <FaMoneyBills />
                                <span>Budget App</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="fixed bottom-0">
                        <NavLink
                            to="logout"
                        >
                            <div className="flex items-center gap-x-2 justify-start mb-10">
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