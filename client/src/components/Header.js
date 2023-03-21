import { Link } from "react-router-dom";

export default function Header(){
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