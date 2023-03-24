import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Header(){
    useEffect(() => {
        fetch('http://localhost:4001/profile', {credentials: 'include'});
    }, [])
    return(
        <header>
            <Link to="/" className="logo">Meu Blog</Link>
            <nav className="">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    )
}