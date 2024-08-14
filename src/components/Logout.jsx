import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('loggedInUser');

        navigate('/'); //checking if the path should be "/" or "/Login", routing will be edited accordingly - Hara
    }, [navigate]);

    return (
        <div className="logout">
            Logging out...
        </div>
    )
}