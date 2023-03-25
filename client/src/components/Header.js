import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";


export default function Header(){
    const {userInfo, setUserInfo} = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:4001/profile', {credentials: 'include'})
            .then(res => {
                res.json().then(userInfo => {
                    setUserInfo(userInfo);
                })
            });
    }, []);

    function logout() {
        fetch('http://localhost:4001/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;
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