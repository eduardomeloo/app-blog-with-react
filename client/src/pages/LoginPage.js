export default function LoginPage() {
    return (
        <form className="login">
            <h1>Login</h1>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" autoComplete="new-password"/>
            <button type="">Login</button>
        </form>
    );
}