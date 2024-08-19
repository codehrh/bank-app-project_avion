import sendbtn from "../assets/images/send.png";
import receivebtn from "../assets/images/receive.png";
import deposit from "../assets/images/deposit.png";
import withdraw from "../assets/images/withdraw.png"
import data from "../assets/data/bankUsers.json";
import Deposit from "../components/Deposit.jsx";
import Withdraw from "../components/Withdraw.jsx";
import { useState, useEffect } from "react";

export default function Transactions() {
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(storedUser);
    }, []);

    return (
        <div className="">
            <div className="min-w-[165vmin] text-xl  p-2.5 ml-14 mr-14 mt-20">
                <div className="font-bold ml-5">Transactions</div>
                <div className="grid grid-cols-2 gap-8 mt-5">
                    <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                        <div className="flex text-xl font-bold p-2">
                            {!showDepositForm ? (
                                <img
                                    src={deposit}
                                    alt="Deposit"
                                    onClick={() => setShowDepositForm(true)} // Show the form on click
                                    className="cursor-pointer"
                                />
                            ) : (
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setShowDepositForm(false)} // Hide the form on close button click
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                    >
                                        X
                                    </button>
                                    <Deposit />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                        <div className="flex text-xl font-bold p-2">
                            {!showWithdrawForm ? (
                                <img
                                    src={withdraw}
                                    alt="Withdraw"
                                    onClick={() => setShowWithdrawForm(true)} // Show the form on click
                                    className="cursor-pointer"
                                />
                            ) : (
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setShowWithdrawForm(false)} // Hide the form on close button click
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                    >
                                        X
                                    </button>
                                    <Withdraw />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5 ">
                    <div className="flex text-lg p-2"><span className="font-bold">Recent Activity</span></div>
                    <table className="text-sm p-6 min-w-[100%]">
                        <thead >
                            <tr className="">
                                <th className="p-2.5">Activity</th>
                                <th className="p-2.5">Type</th>
                                <th className="p-2.5">Time and Date</th>
                            </tr>
                        </thead>
                        <tbody className="mt-2">
                            <tr className="">
                                <td className="p-2.5">null</td>
                                <td className="p-2.5">null</td>
                                <td className="p-2.5">null</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}