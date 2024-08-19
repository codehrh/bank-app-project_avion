import sendbtn from "../assets/images/send.png";
import receivebtn from "../assets/images/receive.png";
import deposit from "../assets/images/deposit.png";
import withdraw from "../assets/images/withdraw.png"
import SendMoney from "../components/SendMoney";
import data from "../assets/data/bankUsers.json"
import { useState, useEffect } from "react";
import ReceiveMoney from "../components/ReceiveMoney";

const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function UserTransactions() {
    const [users, setUsers] = useState(data);
    const [show, setShow] = useState(false);
    const [showSendForm, setShowSendForm] = useState(false);
    const [showReceiveForm, setShowReceiveForm] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(storedUser);
    }, []);


    return (
        <div className="">
            <div className="min-w-[165vmin] text-xl  p-2.5 ml-14 mr-14 mt-20">
                <div className="font-bold ml-5">Transactions</div>
                <div className="text-right text-sm pr-2"><span className="font-bold">Account Balance : </span>{formattedBalance.format(loggedInUser?.balance)}</div>
                <div className="grid grid-cols-2 gap-8 mt-5">
                    <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8 ">
                        <div className="flex text-xl font-bold p-2">
                            {!showSendForm ? (
                                <img
                                    src={sendbtn}
                                    alt="Send Money"
                                    onClick={() => setShowSendForm(true)} // Show the form on click
                                    className="cursor-pointer"
                                />
                            ) : (
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setShowSendForm(false)} // Hide the form on close button click
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                    >
                                        X
                                    </button>
                                    <SendMoney />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 pb-8">
                        <div className="flex text-xl font-bold p-2 ">
                            {!showReceiveForm ? (
                                <img
                                    src={receivebtn}
                                    alt="Receive Money"
                                    onClick={() => setShowReceiveForm(true)} // Show the form on click
                                    className="cursor-pointer"
                                />
                            ) : (
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setShowReceiveForm(false)} // Hide the form on close button click
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold"
                                    >
                                        X
                                    </button>
                                    <ReceiveMoney />
                                </div>
                            )}
                        </div>
                        <div className="flex text-xl font-bold p-2 "></div>
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
        </div >
    )
}