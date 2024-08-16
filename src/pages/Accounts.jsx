import { useEffect, useState } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";




export default function Accounts() {
    const [users, setUsers] = useState(data);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [password, setPass] = useState("");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');



    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPass(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };


    const userExist = (name) => {
        if (users.find(user => user.name === name)) {
            toast.error("Username Exist");
        }
    }
    const findUser = (name) => {
        let foundUser = users.filter((user) => user.name === name);
        return foundUser[0];
    }

    const handleSignin = (event) => {
        event.preventDefault();
        let user = {
            id: JSON.stringify(data.length),
            name: name,
            username: username,
            password: password,
        };
        let bankusers = JSON.parse(data);
        bankusers.push(user);
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    return (
        <div>
            <div>
                <button onClick={toggleModal} className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">Add User</button>
                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <div className="max-w-[960px] bg-slate-200 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5">
                                <div className="max-w-80 grid gap-5">
                                    <h3 className="font-bold text-gray-600 ">Create User</h3>
                                    <form action="" className="space-y-6 text-black" onSubmit={handleSignin}>
                                        <div className="relative">
                                            <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300 iconseffect">
                                                <FaRegUserCircle />
                                            </div>
                                            <input
                                                type="text"
                                                value={name}
                                                placeholder="Name"
                                                onChange={handleName}
                                                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300 iconseffect">
                                                <FaUser />
                                            </div>
                                            <input
                                                type="text"
                                                value={username}
                                                placeholder="Username"
                                                onChange={handleUsername}
                                                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300 iconseffect">
                                                <IoIosMail />
                                            </div>
                                            <input
                                                type="text"
                                                value={email}
                                                placeholder="Email"
                                                onChange={handleEmail}
                                                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300">
                                                <RiLockPasswordFill />
                                            </div>
                                            <input
                                                type="text"
                                                value={password}
                                                placeholder="Password"
                                                onChange={handlePassword}
                                                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg" />
                                        </div>
                                        <button type="submit" className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">Sign up</button>
                                        <ToastContainer />
                                    </form>
                                    <button className="close-modal" onClick={toggleModal}>
                                        X
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            <div className="max-w-[600px] bg-white item-start gap-20 p-5 rounded-2xl shadow-2xl p-2.5">
                <table className="p-6 divide-y divide-slate-200 ">
                    <thead className="">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            users.map((user) =>
                                <tr className="odd:bg-white even:bg-slate-50">
                                    <td className="p-2.5">{user.name}</td>
                                    <td className="p-2.5">{user.username}</td>
                                    <td className="p-2.5">{user.email}</td>
                                    <td className="p-2.5">{user.balance}</td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}