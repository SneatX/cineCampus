import { useNavigate, useParams } from "react-router-dom"
import { ReturnHeader } from "../components/ReturnHeader"

import '../css/pages/MovieDescription.css'

export function MovieDescription(){

    const { idPeli } = useParams()
    const navigate = useNavigate()
    const returnFunction = () =>{
        navigate('/menu')
    }

    return (
        <main className="movieDescription-container">
            <ReturnHeader title='Cinema Section' returnFunction={returnFunction}/>

        </main>
    )
}