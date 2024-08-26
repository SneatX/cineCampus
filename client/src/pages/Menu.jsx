import { useEffect } from "react"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"

export function Menu(){

    const navigate = useNavigate()

    useEffect(()=>{
        let userData = cookies.get('clientData')
        if(!userData) navigate('/')
    }, [])

    let cookies = new Cookies()
    console.log(cookies.get('clientData'))


    const logOut = ()=>{
        cookies.remove('clientData')
        navigate('/')
    }

    return(
        <main>
            <h1>Main menu</h1>
            <button onClick={logOut}>Log out</button>
        </main>
    )
}