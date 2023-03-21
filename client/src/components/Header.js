import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header>
            <a href="/" className="logo">Meu Blog</a>
            <nav className="">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    )
}