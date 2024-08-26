import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
import "../css/Login.css"

export function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()
    const cookies = new Cookies()


    const signIn = async () => {
        if (!username || !password) return setErrorMessage("Username and password are required")

        let res = await fetch(`http://localhost:3000/getClientsData?nick=${username}`)
        res = await res.json()
        if (res.status === 404)
            return setErrorMessage("Incorrect username or password, try again")

        let {data: clientData} = res
        if ( clientData.pass != password)
        return setErrorMessage("Incorrect username or password, try again")

        cookies.set('clientData', clientData, {path: '/'})
        navigate('/menu')
    };

    return (
        <main>
            <section className="title-container">
                <h1>Sign in</h1>
                <p>Enter your cineCampus nickname and password</p>
                {
                    errorMessage != null && (
                        <p className="error-message">{errorMessage}</p>
                    )
                }
            </section>
            <section className="inputs-container">

                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} />

                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />

            </section>
            <section className="buttons-container">
                <button onClick={signIn}>Sign in</button>
                <Link className="signup-button">Sign up</Link>
            </section>
        </main>
    )

}