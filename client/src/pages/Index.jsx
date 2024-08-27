import { useEffect } from "react"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
import { IndexHeader } from "../components/IndexHeader"

import '../css/pages/Index.css'

export function Index(){
    const navigate = useNavigate()
    const cookies = new Cookies()

    let userData = cookies.get('clientData')

    useEffect(()=>{
        if(!userData) navigate('/')
    }, [])


    const logOut = ()=>{
        cookies.remove('clientData')
        navigate('/')
    }

    return(
        <main className="index-container">
            <IndexHeader nombre={userData.nombre} apellido={userData.apellido} imgLink={userData.img}></IndexHeader>
            <button onClick={logOut}>Log out</button>
        </main>
    )
}