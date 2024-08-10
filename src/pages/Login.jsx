import "./Login.css"
import Logo from "../components/Logo/Logo";
import { useState, useEffect } from 'react';
import userLogin from "../assets/data/userLogin.json";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const { username, password } = userLogin;
    const [credentials, setCredentials] = useState("");
    const navigate = useNavigate();

    //not in use
    // const [userError] = useState('')
    // const [passwordError] = useState('')
    // const [Login, setUserLogin] = useState("");

    //using the imported login file with credentials
    useEffect (() => {
        setCredentials(userLogin);
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
            navigate('/Home');
        } else {
            alert("Incorrect Credentials");
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
        <body>
            <div className="Login">
                <Logo></Logo>
                <form className="login" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value ={username} 
                        placeholder="username" 
                        onChange={handleUser} 
                    />
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="Password" 
                        onChange={handlePassword}
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </body>
    )
}