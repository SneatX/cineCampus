import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, parse } from 'date-fns';
import MotionNumber from 'motion-number'
import { ReturnHeaderPayments } from "../components/ReturnHeaderPayments";

import "../css/pages/Payments.css"

export function Payments(){
    let {arg} = useParams()
    let data = {}
    data = JSON.parse(decodeURIComponent(arg))
    console.log(data)

    let [movie, setMovie] = useState({})
    const navigate = useNavigate()

    const combinedDate = `${data.date}T${data.hour}`
    const dateObj = parse(combinedDate, "yyyy-MM-dd'T'HH:mm", new Date());
    const formattedDate = format(dateObj, "EEE, dd MMM yyyy. HH:mm");

    const returnFunction = () => {
        navigate(`/chooseSeat/${data.idMovie}`)
    }

    const buyTickets = async() =>{
        const url = "http://localhost:3000/caso4"
        for(let seat of data.seats){
            let object = {
                idFuncion: data.idFuncion,
                idCliente: data.idCliente,
                asiento: seat,
                pago: true
            }
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object)
            })
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const result = await res.json();
            console.log('Success:', result);
        }
    }

    useEffect(() => {
        const getMovieData = async () => {
            let res = await fetch(`http://localhost:3000/caso3?id=${data.idMovie}`)
            setMovie(await res.json())
        }
        getMovieData()
    }, [])

    return(
        <>
            <main className="payments-container">
                <ReturnHeaderPayments title="Order Summary" returnFunction={returnFunction}/>
                <section className="payments-movieData">
                    <div>
                        <img className="payments-img" src={movie.img} />
                    </div>
                    <div className="payments-text">
                        <div>
                            <h1 className="payments-movieName">{movie.titulo}</h1>
                            <p className="payments-genres">{movie.generos != null && movie.generos.join(', ')}</p>
                        </div>
                        <div className="payments-dateContainer">
                            <p>HARTONO MALL</p>
                            <p className="">{formattedDate}</p>
                        </div>
                    </div>
                </section>


            </main>

            <section className="payments-pricesContainer">
                <p className="payments-orderNumber">Order number: <span className="payments-orderNumber-span">9167649872</span></p>

                <article className="payments-table">
                    <div>
                        <p>{data.seats.length} TICKET</p>
                        {data.seats && <p>{data.seats.join(', ')}</p>}
                    </div>
                    <hr />
                    <div>
                        <p>REGULAR SEAT</p>
                        <MotionNumber
                            value={data.price}
                            format={{ style: 'currency', currency: 'COP' }} 
                            locales="en-US"
                        />

                    </div>
                    <hr />
                    <div>
                        <p>SERCIVE FEE</p>
                        <p>$ 0,00</p>
                    </div>
                </article>

                <button onClick={()=>{buyTickets()}} className="payments-BuyButton">Buy ticket</button>
            </section>
        </>
    )
}