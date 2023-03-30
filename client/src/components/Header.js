import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";


export default function Header(){
    const {userInfo, setUserInfo} = useContext(UserContext)

    const apiUrl = process.env.REACT_APP_MODE_PRODUCAO === 'FALSE' ?
                   process.env.REACT_APP_API_HOMOLOGACAO :
                   process.env.REACT_APP_API_PRODUCAO

    useEffect(() => {
        fetch(apiUrl+'/profile', {credentials: 'include'})
            .then(res => {
                res.json().then(userInfo => {
                    setUserInfo(userInfo);
                })
            });
    }, []);

    function logout() {
        fetch(apiUrl+'/logout', {
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
                    <a href="/" onClick={logout}>
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