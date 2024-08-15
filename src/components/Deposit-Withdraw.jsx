import { useState } from "react";
import data from "../assets/data/bankUsers.json";



export default function MoneyTransfer() {
    const [users, setUsers] = useState(data);
    const [show, setShow] = useState(false); // flag to hide or show elements
    const [user, setUser] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("withdraw");



    const userExist = (name) => {
        return users.find(user => user.name === name);
    }

    const findUser = (name) => {
        let foundUser = users.filter((user) => user.name === name);
        return foundUser[0];
    }

    const handleTransaction = () => {
        const newAmount = Number(amount);
        if (
            userExist(sender) &&
            newAmount > 0
        ) {
            const userInfo = findUser(user);
            if (senderInfo.balance >= newAmount) {
                const updateUsers = users.map((user) => {
                    if (user.name === user) {
                        if (transactionType === "withdraw") {
                            if (user.balance >= newAmount) {
                                return { ...user, balance: user.balance - newAmount };
                            } else {
                                alert ("Not enough balance");
                            }
                        }
                    }});
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
    );
}