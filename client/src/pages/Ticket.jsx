import { ReturnHeader } from "../components/ReturnHeader"
import { useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns";

import '../css/pages/ticket.css'
import { useEffect, useState } from "react"
import MotionNumber from "motion-number";

export function Ticket() {
    const navigate = useNavigate()
    let { arg } = useParams()
    let data = JSON.parse(decodeURIComponent(arg))

    let [movie, setMovie] = useState()

    useEffect(() => {
        const fetchData = async () => {
            let movieRes = await fetch(`http://localhost:3000/caso3?id=${data.idMovie}`)
            movieRes = await movieRes.json()

            console.log("data: ", data)
            console.log("movie: ", movieRes)
            setMovie(movieRes)
        }

        fetchData()
    }, [])

    const returnFunction = () => {
        navigate('/menu')
    }

    return (
        <main className="ticket-container">
            <ReturnHeader title="Ticket" returnFunction={returnFunction}></ReturnHeader>
            <section className="ticket-entrance">
                {movie != null &&
                    <>
                        <img className="ticket-img" src={movie.img} alt="" />
                        <article className="ticket-info">
                            <h1>{movie.titulo}</h1>
                            <p>Show this ticket at the entrance</p>

                            <hr />
                        </article>
                    </>
                }

                <article className="ticket-cinemaInfo">
                    <div className="ticket-cinemaInfo-text">
                        <p>Cinema</p>
                        <h1>Hartono Mall 12</h1>
                    </div>
                    <div className="ticket-cinemaInfo-imgContainer">
                        <img className="ticket-cinemaInfo-img" src="/cinema1.svg" alt="" />
                    </div>
                </article>

                <article className="ticket-functionInfo-container">
                    <div className="ticket-functionInfo-box">
                        <div className="ticket-functionInfo-box-1">
                            <p className="ticket-functionInfo-box-title">Date</p>
                            <p className="ticket-functionInfo-box-data">{format(data.date, "EEE, MMM do yyyy")}</p>
                        </div>
                        <div className="ticket-functionInfo-box-2">
                            <p className="ticket-functionInfo-box-title">Time</p>
                            <p className="ticket-functionInfo-box-data">{data.hour}</p>
                        </div>
                    </div>
                    <div className="ticket-functionInfo-box">
                        <div className="ticket-functionInfo-box-1">
                            <p className="ticket-functionInfo-box-title">Cinema Hall #</p>
                            <p className="ticket-functionInfo-box-data">Cinema A</p>
                        </div>
                        <div className="ticket-functionInfo-box-2">
                            <p className="ticket-functionInfo-box-title">Seat</p>
                            <p className="ticket-functionInfo-box-data">{data.seats.join(', ')}</p>
                        </div>
                    </div>
                    <div className="ticket-functionInfo-box">
                        <div className="ticket-functionInfo-box-1">
                            <p className="ticket-functionInfo-box-title">Cost</p>
                            <MotionNumber
                                className="ticket-functionInfo-box-data"
                                value={data.seats.length * data.price}
                                format={{ style: 'currency', currency: 'USD' }}
                                locales="en-US"
                            />
                        </div>
                        <div className="ticket-functionInfo-box-2">
                            <p className="ticket-functionInfo-box-title">Function ID</p>
                            <p className="ticket-functionInfo-box-data-idFuncion">{data.idFuncion}</p>
                        </div>
                    </div>
                </article>

                <div className="dotted-line"></div>

                <article className="ticket-barcode-container">
                    <img className="ticket-barcode" src="/barcode.svg" alt="" />
                </article>
            </section>
        </main>
    )
}