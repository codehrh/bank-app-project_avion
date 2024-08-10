import "./Login.css"
import Logo from "../components/Logo/Logo";
import { useState } from 'react';
import userLogin from "../assets/data/userLogin.json";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [userError] = useState('')
    const [passwordError] = useState('')
    const { username, password } = userLogin;
    const navigate = useNavigate();
    const [Login, setUserLogin] = useState("");


    const handleUser = (event) => {
        setUser(event.target.value);
        console.log(user);
    };
    const handlePassword = (event) => {
        setPass(event.target.value);
        console.log(pass);
    };
    const handleLogin = () => {
        // Set initial error values to empty

        // Check if the user has entered both fields correctly
        if ('' === user) {
            alert('Please enter your username')
            return
        }

        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user)) {
        //     alert('Please enter a valid email')
        //     return
        // }

        if ('' === pass) {
            alert('Please enter a password')
            return
        }

        if (pass.length < 7) {
            alert('The password must be 8 characters or longer')
            return
        }

        if (user === userLogin.username && pass === userLogin.password) {
            navigate('/home');
        }
        if (user !== userLogin.username || pass !== userLogin.password) {
            alert("Incorrect Credentials")
            return
        }
        // Authentication calls will be made here...

        /* <User employee={bankEmployee} address={address}></User>
          {bankUsers.map((bankUsers) => {
            return (
              <div key={bankUsers.id}>
                {bankUsers.name} {bankUsers.balance} */
    }
    return (
        <body>
            <div className="Login">
                <Logo></Logo>
                <form className="login">
                    <h1>Login</h1>
                    <label>Username:</label>
                    <input type="text" placeholder="username" onChange={handleUser}></input>
                    <label>Password:</label>
                    <input type="password" placeholder="Password" onChange={handlePassword}></input>
                    <br />
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </body>

    )
}