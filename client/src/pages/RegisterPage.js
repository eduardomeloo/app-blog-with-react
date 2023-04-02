import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);
    const apiUrl =  process.env.REACT_APP_MODE_PRODUCAO === 'FALSE' ?
                    process.env.REACT_APP_API_HOMOLOGACAO :
                    process.env.REACT_APP_API_PRODUCAO

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type','application/json');

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch(apiUrl+'/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: headers
        });
        if (response.status === 200) {
            alert('Registration successful');
            setRedirect(true);
        } else {
            alert('Registration failed');
        }
    }

    if(redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input  type="text" placeholder="username" 
                    value={username} onChange={ev => setUsername(ev.target.value)}/>

            <input  type="password" placeholder="password" autoComplete="new-password"
                    value={password} onChange={ev => setPassword(ev.target.value)}/>

            <button type="">Register</button>
        </form>
    );
}