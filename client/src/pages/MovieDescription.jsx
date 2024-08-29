import { useNavigate, useParams } from "react-router-dom"
import { ReturnHeader } from "../components/ReturnHeader"

import '../css/pages/MovieDescription.css'
import { useEffect, useState } from "react"

export function MovieDescription() {

    let [movieData, setMovieData] = useState({})

    // let [movieData, setMovieData] = useState({
    //     _id: ""
    //     titulo: "",
    //     generos: [],
    //     duracion: "",
    //     sipnosis: "",
    //     img: ""
    // })
    const { idPeli } = useParams()
    const navigate = useNavigate()

    const returnFunction = () => {
        navigate('/menu')
    }


    useEffect(() => {
        const getMovieData = async () => {
            let res = await fetch(`http://localhost:3000/caso3?id=${idPeli}`)
            setMovieData(await res.json())
        }
        getMovieData()
    }, [])

    return (
        <main className="movieDescription-container">
            <ReturnHeader title='Cinema Section' returnFunction={returnFunction} />
            <img className="movieDescription-img" src={movieData.img} />

            <article className="movieDescription-info">
                <section className="movieDescription-info-text">
                    <h1 className="movieDescription-info-title">{movieData.titulo}</h1>
                    {
                        movieData.generos != undefined && //Hay que validar que ya exista movieData.generos
                        <p className="movieDescription-info-genres">{movieData.generos.join(', ')}</p>
                    }
                </section>

                <button className="movieDescription-trailerButton">
                    <svg width="13" height="17" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L0.75 11.1962L0.750001 0.803847L9 6Z" fill="currentColor" />
                    </svg>
                    <p>Watch Trailer</p>
                </button>

            </article>
        </main>
    )
}