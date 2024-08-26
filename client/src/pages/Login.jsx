import { useState } from "react";
import { Link } from "react-router-dom"
import "../css/Login.css"

export function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState()


    const signIn = async() => {
        let clientRes
        try{
            clientRes = await (await fetch(`http://localhost:3000/getClientsData?nick=${username}`)).json()
        } catch(err){
            console.log(err)
        }

        if(clientRes.status != 200) return setErrorMessage("Incorrect username or password, try again")
        
        const {data: clientData} = clientRes
        if(clientData.pass != password) return setErrorMessage("Incorrect username or password, try again")
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
                onChange={(e) => setPassword(e.target.value)}/>

            </section>
            <section className="buttons-container">
                <button onClick={signIn}>Sign in</button>
                <Link className="signup-button">Sign up</Link>
            </section>
        </main>
    )

}