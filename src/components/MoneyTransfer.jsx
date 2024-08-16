import { useState } from "react";
import data from "../assets/data/bankUsers.json";



export default function MoneyTransfer() {
    const [users, setUsers] = useState(data);
    const [show, setShow] = useState(false); // flag to hide or show elements
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");



    const userExist = (name) => {
        return users.find(user => user.name === name);
    }

    const findUser = (name) => {
        let foundUser = users.filter((user) => user.name === name);
        return foundUser[0];
    }

    const transferMoney = () => {
        const newAmount = Number(amount);
        if (
            userExist(sender) &&
            userExist(receiver) &&
            sender !== receiver &&
            newAmount > 0
        ) {
            const senderInfo = findUser(sender);
            if (senderInfo.balance >= newAmount) {
                const updateUsers = users.map((user) => {
                    if (user.name === sender) {
                        return { ...user, balance: user.balance - newAmount };
                    } else if (user.name === receiver) {
                        return { ...user, balance: user.balance + newAmount };
                    }
                    return user;
                });
                setUsers(updateUsers);
            } else {
                alert("Not Enough Balance");
            }
        } else {
            alert("Transaction Invalid");
        }
        setSender("");
        setReceiver("");
        setAmount("");
        setShow(false);
    };

    return (
        <div className="max-w-[600px] bg-slate-200 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5">
            <div className="moneyTransfer">
                {
                    <div>
                        {users.map((user) => {
                            return (

                                <div key={user.id}>
                                    {user.name} - {user.balance}
                                </div>
                            );
                        })}
                        <button onClick={() => setShow(show ? false : true)}>
                            Transfer{/* show is inversely proportional to value - if show is true, value is false; if show is false, the value is true */}
                        </button>
                    </div>
                }
                {show && (
                    <form onSubmit={transferMoney}>
                        <label>Sender:</label>
                        <input
                            type="text"
                            value={sender}
                            onChange={(event) => setSender(event.target.value)}
                        ></input>{" "}
                        <br />
                        <label>Receiver:</label>
                        <input
                            type="text"
                            value={receiver}
                            onChange={(event) => setReceiver(event.target.value)}
                        ></input>{" "}
                        <br />
                        <label>Amount:</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        ></input>{" "}
                        <br />
                        <button>Confirm Transfer</button>
                    </form>
                )}
            </div>
        </div>
    );
}