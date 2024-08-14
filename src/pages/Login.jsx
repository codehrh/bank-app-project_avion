
import Logo from "../components/Logo";
import { useState, useEffect } from 'react';
import bankUsers from "../assets/data/bankUsers.json";
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid'

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const { username, password } = bankUsers;
    const [credentials, setCredentials] = useState("");
    const navigate = useNavigate();

    //not in use
    // const [userError] = useState('')
    // const [passwordError] = useState('')
    // const [Login, setUserLogin] = useState("");

    //using the imported login file with credentials
    useEffect(() => {
        setCredentials(bankUsers);
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
        <body className="login-body">
            <div className="Login">
                <Logo></Logo>
                <div className="left-align">
                    <h2>
                        Financial <span className="accent">  Freedom</span> at Your Fingertips
                    </h2>
                    <h3>
                        Empower Your Future, One Transaction at a Time
                    </h3>
                </div>

                <form className="login" onSubmit={handleLogin}>
                    <UserIcon className="icons"></UserIcon>
                    <h3>User Login</h3>
                    <div className="inputs">
                        <label><UserIcon className="icons-s"></UserIcon>|</label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={handleUser}
                        />
                    </div>
                    <br />
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