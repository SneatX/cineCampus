import { useEffect, useState } from "react"
import "../css/components/ComingSoon.css"

export function ComingSoon() {

    let [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            let res = await fetch("http://localhost:3000/caso2");
            res = await res.json();
            let { data: [...moviesArray] } = res
            setMovies(moviesArray)
        };

        getMovies();
    }, []);

    return (
        <section className="commingSoon-container">
            {movies.map((movie, index) => (
                <article className="commingSoon-item" key={index}>
                    <img className="commingSoon-img" src={movie.img} alt="imagen" />
                    <div className="commingSoon-text-container">
                        <p className="commingSoon-text-title">{movie.titulo} ({new Date(movie.horarios[0].fecha_inicio).getFullYear()})</p>
                        <p className="commingSoon-text-genres">{movie.generos.join(', ')}</p>
                    </div>
                </article>
            ))}
        </section>
    )
}