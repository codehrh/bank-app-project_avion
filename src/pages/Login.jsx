
import Logo from "../components/Logo";
import { useState, useEffect } from 'react';
import empLogin from "../assets/data/empLogin.json";
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const { username, password } = empLogin;
    const [credentials, setCredentials] = useState("");
    const navigate = useNavigate();

    //not in use
    // const [userError] = useState('')
    // const [passwordError] = useState('')
    // const [Login, setUserLogin] = useState("");

    //using the imported login file with credentials
    useEffect(() => {
        setCredentials(empLogin);
    }, []);

    const handleUser = (event) => {
        setUser(event.target.value);
    };

    const handlePassword = (event) => {
        setPass(event.target.value);
    };

    const handleLogin = (event) => {

        event.preventDefault();

        const matchedUser = credentials.find(
            cred => cred.username === user && cred.password === pass
        );

        if (matchedUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
            navigate('/Home');
            toast.success("Login Successful");
        } else {
            toast.error("Incorrect Credentials");
        }
    }

    // Set initial error values to empty

    // Check if the user has entered both fields correctly
    // if ('' === user) {
    //     alert('Please enter your username')
    //     return
    // }

    //  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user)) {
    //    alert('Please enter a valid email')
    //  return
    // }

    // if ('' === pass) {
    //     alert('Please enter a password')
    //     return
    // }

    // if (pass.length < 7) {
    //     alert('The password must be 8 characters or longer')
    //     return
    // }

    // if (user === userLogin.username && pass === userLogin.password) {
    //     navigate('/home');
    // }
    // if (user !== userLogin.username || pass !== userLogin.password) {
    //     alert("Incorrect Credentials")
    //     return
    // }

    /* <User employee={bankEmployee} address={address}></User>
      {bankUsers.map((bankUsers) => {
        return (
          <div key={bankUsers.id}>
            {bankUsers.name} {bankUsers.balance} */
    return (

        <body className="flex flex-col items-center justify-center h-screen bg-gradient-to-l from-sky-300 via-yellow-200 to-yellow-100">
            <Logo />
            <div className="mb-8">
                <h3>Financial Freedom at Your Fingertips</h3>
            </div>
            <div className="max-w-[960px] bg-black-dark items-center gap-20 p-5 rounded-2xl shadow-2xl p-2.5">
                <div className="max-w-80 grid gap-5">
                    <h3 className="font-bold text-gray-600 ">User Login</h3>
                    <form action="" className="space-y-6 text-black" onSubmit={handleLogin}>
                        <div className="relative">
                            <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300 iconseffect">
                                <FaUser />
                            </div>
                            <input
                                type="text"
                                value={username}
                                placeholder="Username"
                                onChange={handleUser}
                                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg" />
                        </div>
                        <div className="relative">
                            <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300">
                                <RiLockPasswordFill />
                            </div>
                            <input
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={handlePassword}
                                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg" />
                        </div>
                        <button type="submit" className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">Login</button>
                    </form>

                </div>
            </div>
            <ToastContainer />
        </body>
    )
}