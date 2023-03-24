import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Header(){
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        fetch('http://localhost:4001/profile', {credentials: 'include'})
            .then(res => {
                res.json().then(userInfo => {
                    setUserId(userInfo.id);
                    setUsername(userInfo.username);
                })
            });
    }, []);

    function logout() {
        fetch('http://localhost:4001/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserId(null);
        setUsername(null);
    }
    return(
        <header>
            <Link to="/" className="logo">Meu Blog</Link>
            {username ? (
                <nav className="">
                    <Link to="/create">Create new post</Link>
                    <a onClick={logout}>
                        Logout
                    </a>
                </nav>
            ): (
                <nav className="">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            )}
            
        </header>
    )
}