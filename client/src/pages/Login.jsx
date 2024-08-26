import { useState } from "react";
import { Link } from "react-router-dom"
import "../css/Login.css"

export function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const signIn = async() => {
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <main>
            <section className="title-container">
                <h1>Sign in</h1>
                <p>Enter your cineCampus nickname and password</p>
            </section>
            <section className="inputs-container">

                <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)} />

                <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}/>

            </section>
            <section className="buttons-container">
                <button onClick={signIn}>Sign in</button>
                <Link className="signup-button">Sign up</Link>
            </section>
        </main>
    )

}