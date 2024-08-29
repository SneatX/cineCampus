import { useNavigate, useParams } from "react-router-dom"
import { ReturnHeader } from "../components/ReturnHeader"

import '../css/pages/MovieDescription.css'
import { useEffect, useState } from "react"

export function MovieDescription() {

    const cast = [
        {
            name: "Leonardo Dicaprio",
            paper: "Principal character",
            img: "https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg"
        },
        {
            name: "Jenifer Aniston",
            paper: "Secundary character",
            img: "https://upload.wikimedia.org/wikipedia/commons/1/16/JenniferAnistonHWoFFeb2012.jpg"
        },
        {
            name: "wayne Johnson",
            paper: "Secundary character",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg"
        },
        {
            name: "wayne Johnson2",
            paper: "Secundary character",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg"
        },
        {
            name: "wayne Johnson3",
            paper: "Secundary character",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg"
        }
    ]

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
            res = await res.json()
            res.cast = cast
            setMovieData(res)
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

            <article className="movieDescription-sipnosis">
                <p className="movieDescription-sipnosis-text">{movieData.sipnosis}</p>
            </article>

            <article className="movieDescription-cast">
                <h1 className="cast-title">Cast</h1>
                <div className="actors-container">
                    {
                        movieData.cast != undefined && movieData.cast.map((actor) => (
                            <section key={actor.name} className="movieDescription-actor">
                                <img src={actor.img} className="actor-img" />
                                <div className="actor-text">
                                    <p className="actor-name">{actor.name}</p>
                                    <p className="actor-paper">{actor.paper}</p>
                                </div>
                            </section>
                        ))
                    }
                </div>
            </article>

            <article className="movieDescription-cinema">
                <h1 className="cinema-title">Cinema</h1>
                <section className="cinemas-items-container">
                    <div className="cinemas-item cinemas-item-selected">
                        <div className="cinemas-item-text">
                            <p className="cinemas-item-name">Atrium Cinemas</p>
                            <p className="cinemas-item-subname">Staff Lines, Saddar, Karachi</p>
                        </div>
                        <div className="cinemas-item-img-container">
                            <img className="cinemas-item-img" src="/cinema1.svg"/>
                        </div>
                    </div>
                    <div className="cinemas-item">
                        <div className="cinemas-item-text">
                            <p className="cinemas-item-name">Neuplex</p>
                            <p className="cinemas-item-subname">Khayaban - e Shaheen, Dha Phase 8</p>
                        </div>
                        <div className="cinemas-item-img-container">
                            <img className="cinemas-item-img" src="/cinema2.svg"/>
                        </div>
                    </div>
                </section>
            </article>

            <article className="movieDescription-bookButton">
                <button className="bookButton">
                    Book Now
                </button>
            </article>

        </main>
    )
}