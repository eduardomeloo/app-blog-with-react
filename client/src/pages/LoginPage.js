import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext)

    const apiUrl =  process.env.REACT_APP_MODE_PRODUCAO === 'FALSE' ?
                    process.env.REACT_APP_API_HOMOLOGACAO :
                    process.env.REACT_APP_API_PRODUCAO

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch(apiUrl+'/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
            
        } else {
            alert('wrong credentials');
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <input  type="text" placeholder="username" 
                        value={username}
                        onChange={ev => setUsername(ev.target.value)} />

                <input  type="password" placeholder="password" value={password}
                        autoComplete="new-password"
                        onChange={ev => setpassword(ev.target.value)}  />

                <button type="">Login</button>
            </form>

            <div className="table-wrapper">
                <table>
                    <caption>Acesso para teste</caption>
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Senha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}