import { useEffect } from "react"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
import { IndexHeader } from "../components/IndexHeader"
import { SearchBar } from "../components/SearchBar"
import { Subtitle } from "../components/Subtitle"
import { Carousel } from "../components/Carousel"
import { ComingSoon } from "../components/ComingSoon"
import { CinemaFooter } from "../components/CinemaFooter"

import '../css/pages/Index.css'

export function Index(){
    const navigate = useNavigate()
    const cookies = new Cookies()

    let userData = cookies.get('clientData')

    useEffect(()=>{
        if(!userData) navigate('/')
    }, [userData])


    const logOut = ()=>{
        cookies.remove('clientData')
        navigate('/')
    }

    if(!userData){
        return <p>Loading...</p>;
    }

    return(
        <main className="index-container">
            <IndexHeader nombre={userData.nombre} apellido={userData.apellido} imgLink={userData.img}></IndexHeader>
            <SearchBar />
            <Subtitle text="Now playing"/>
            <Carousel />
            <Subtitle text="Coming soon"/>
            <ComingSoon />
            <CinemaFooter logOut={logOut}/>
        </main>
    )
}