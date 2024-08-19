import { useState } from "react";
import data from "../assets/data/bankUsers.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});


export default function Accounts() {
    const [users, setUsers] = useState(data.filter(user => user.type === 'User'));
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPass] = useState("");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');



    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastName = (event) => {
        setLastName(event.target.value);
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


    const userExists = (username) => {
        return users.some(user => user.username === username);
    };

    const emailExists = (email) => {
        return users.some(user => user.email === email);
    };


    const findUser = (name) => {
        let foundUser = users.filter((user) => user.name == name);
        return foundUser[0];
    }

    const handleSignin = (event) => {
        event.preventDefault();
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!firstname) {
            toast.error("Enter your first name!");
        }
        if (!lastname) {
            toast.error("Enter your last name!");
        }
        if (!username) {
            toast.error("Enter your username!");
        } else if (userExists(username)) {
            toast.error("Username already exists!");
            return;
        }
        if (!email) {
            toast.error("Enter your email!");
        } else if (!emailFormat.test(email)) {
            toast.error("Invalid email format!");
            return;
        } else if (emailExists(email)) {
            toast.error("Email already exists. Use a different email!");
            return;
        } if (!password) {
            toast.error("Enter your password!");
        } else {
            const newUser = {
                id: JSON.stringify(data.length), // Incrementing the ID based on the length
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                email: email,
                balance: 0
            };

            setUsers([...users, newUser]);

            setFirstName('');
            setLastName('');
            setUsername('');
            setPass('');
            setEmail('');

            toast.success("User created successfully");
        }
    };


    return (
        <div>
            <div className="min-w-[165vmin] bg-slate-40 items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5 mt-20 ml-14">
                <div className="text-xl font-bold p-2.5">Accounts</div>
                <div className="text-sm p-2 flex item-start">
                    <table className="p-6 divide-y divide-slate-200 min-w-[100%]">
                        <thead >
                            <tr className="">
                                <th className="p-2.5">Name</th>
                                <th className="p-2.5">Username</th>
                                <th className="p-2.5">Email</th>
                                <th className="p-2.5">Current Balance</th>
                            </tr>
                        </thead>
                        <tbody className="mt-2">
                            {users.map((u) => (
                                <tr key={u.id} className="odd:bg-white even:bg-slate-50">
                                    <td className="p-2.5">{u.firstname} {u.lastname}</td>
                                    <td className="p-2.5">{u.username}</td>
                                    <td className="p-2.5">{u.email}</td>
                                    <td className="p-2.5">{formattedBalance.format(u.balance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8  ml-14 ">
                <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5 pb-8">
                    <div className="flex text-xl font-bold p-2 ">Create User</div>
                    <form action="" className="text-sm space-y-6 text-black flex flex-col mx-2" onSubmit={handleSignin}>
                        <div className="flex flex-col items-start justify-start mt-5 mx-2">
                            <div className="mx-1 mb-1">
                                First Name
                            </div>
                            <input
                                type="text"
                                value={firstname}
                                placeholder="First Name"
                                onChange={handleFirstName}
                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg" />
                        </div>
                        <div className="flex flex-col items-start justify-start mx-2">
                            <div className="mx-1 mb-1">
                                Last Name
                            </div>
                            <input
                                type="text"
                                value={lastname}
                                placeholder="Last Name"
                                onChange={handleLastName}
                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"    >
                            </input>
                        </div>
                        <div className="flex flex-col items-start justify-start mx-2">
                            <div className="mx-1 mb-1">
                                Username
                            </div>
                            <input
                                type="text"
                                value={username}
                                placeholder="Username"
                                onChange={handleUsername}
                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"    >
                            </input>
                        </div>
                        <div className="flex flex-col items-start justify-start mx-2">
                            <div className="mx-1 mb-1">
                                Email
                            </div>
                            <input
                                type="text"
                                value={email}
                                placeholder="Email"
                                onChange={handleEmail}
                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"    >
                            </input>
                        </div>
                        <div className="flex flex-col items-start justify-start mx-2">
                            <div className="mx-1 mb-1">
                                Password
                            </div>
                            <input
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={handlePassword}
                                className="w-full bg-white-light py-2 px-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"    >
                            </input>
                        </div>
                        <div className="flex flex-col items-start justify-start mx-2">
                            <div className="w-full mt-2 mb-1">
                                <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-cyan-200 font-semibold rounded-full py-2">Add User</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="bg-slate-40 items-center gap-20 p-4 rounded-2xl shadow-2xl p-2.5 mt-5 ">
                    <div className="flex text-xl font-bold p-2">Recent Activity</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}