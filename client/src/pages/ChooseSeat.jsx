import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Cookies from "universal-cookie";
import { format } from "date-fns";

import { ReturnHeader } from "../components/ReturnHeader";
import "../css/pages/ChooseSeat.css"

export function ChooseSeat() {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const { idPeli } = useParams()

    const [functions, setFunctions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedFunction, setSelectedFunction] = useState(functions[0]);

    const uniqueDates = [...new Set(functions.map(f => format(new Date(f.fecha_inicio), 'yyyy-MM-dd')))];
    const availableTimes = functions
        .filter(f => format(new Date(f.fecha_inicio), 'yyyy-MM-dd') === selectedDate)
        .map(f => format(new Date(f.fecha_inicio), 'HH:mm'));

    let userData = cookies.get('clientData')

    useEffect(() => {
        if (!userData) navigate('/');
        fetchFunctions();
    }, []);

    const returnFunction = () => {
        navigate('/menu')
    }

    const fetchFunctions = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getFunctionsByMovie?id=${idPeli}`);
            const data = await response.json();
            setFunctions(data);
            if (data.length > 0) {
                setSelectedDate(format(new Date(data[0].fecha_inicio), 'yyyy-MM-dd'));
                setSelectedTime(format(new Date(data[0].fecha_inicio), 'HH:mm'));
                setReservedSeats(data[0].asientosOcupados);
            }
        } catch (error) {
            console.error("Error fetching functions:", error);
        }
    };

    // console.log("Functions", functions)
    // console.log("selectedDate", selectedDate)
    // console.log("selectedTime", selectedTime)
    // console.log("selectedSeats", selectedSeats)
    // console.log("reservedSeats", reservedSeats)
    // // console.log("totalPrice", totalPrice)

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
        setSelectedSeats([]);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        const findSelectedFunction = functions.find(f =>
            format(new Date(f.fecha_inicio), 'yyyy-MM-dd') === selectedDate &&
            format(new Date(f.fecha_inicio), 'HH:mm') === time
        );
        if (findSelectedFunction) {
            setReservedSeats(findSelectedFunction.asientosOcupados);
            setSelectedFunction(findSelectedFunction);
        }
        setSelectedSeats([]);
    };

    useEffect(() => {
        calcTotalPrice();
        if(!selectedFunction) setSelectedFunction(functions[0])
    }, [selectedSeats, functions]);

    const calcTotalPrice = () => {
        if (!functions[0]) return
        setTotalPrice(functions[0].precio * selectedSeats.length);
    }

    const toggleSeatSelection = (seatId) => {
        calcTotalPrice()
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter(seat => seat !== seatId);
            } else {
                return [...prevSelectedSeats, seatId];
            }
        });
    };

    const SeatRow = ({ rowLabel, seatCount }) => {
        const seats = [];
        for (let i = 0; i < seatCount; i++) {
            const seatId = `${rowLabel}${i + 1}`;
            const isReserved = reservedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);
            seats.push(
                <React.Fragment key={seatId}>
                    <input
                        type="checkbox"
                        name="seat"
                        value={seatId}
                        id={seatId}
                        checked={isSelected}
                        disabled={isReserved}
                        className={isReserved ? "reserved" : ""}
                        onChange={() => toggleSeatSelection(seatId)}
                    />
                    <label htmlFor={seatId} data-place={i + 1}></label>
                </React.Fragment>
            );
        }
        return (
            <div fila={rowLabel}>
                <small>{rowLabel}</small>
                <div className="asientos__lista">{seats}</div>
            </div>
        );
    };

    const goToPayments = () =>{
        let object = {
            idMovie : idPeli,
            idFuncion: selectedFunction._id,
            idCliente: userData._id,
            seats: selectedSeats,
            date : selectedDate,
            hour : selectedTime,
            price: functions[0].precio
        }

        let quetyObject = encodeURIComponent(JSON.stringify(object))

        navigate(`/payments/${quetyObject}`)
    }

    return (
        <main className="chooseSeat-container">
            <ReturnHeader title="Choose Seat" returnFunction={returnFunction}></ReturnHeader>
            <article className="chooseSeat-welcome">
                <img src="/curvedLine.svg" className="chooseSeat-welcome-curvedImg" />
                <p className="chooseSeat-welcome-text">Screen this way</p>
            </article>

            <article className="asientos">
                <form id="myform">
                    <article className="asientos__normal">
                        <SeatRow rowLabel="A" seatCount={5} />
                        <SeatRow rowLabel="B" seatCount={7} />
                    </article>
                    <article className="asientos__preferenciales">
                        <SeatRow rowLabel="C" seatCount={9} />
                        <SeatRow rowLabel="D" seatCount={9} />
                        <SeatRow rowLabel="E" seatCount={9} />
                        <SeatRow rowLabel="F" seatCount={9} />
                    </article>
                </form>
            </article>

            <article className="chooseSeat-seatOptions">
                <div className="seatOptions-item">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6.26208" r="6" fill="#323232" />
                    </svg>
                    <p>Avaliable</p>
                </div>
                <div className="seatOptions-item">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6.26208" r="6" fill="#CECECE" />
                    </svg>
                    <p>Reserved</p>
                </div>
                <div className="seatOptions-item">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6.26208" r="6" fill="#FE0000" />
                    </svg>
                    <p>Selected</p>
                </div>
            </article>

            <article className="chooseSeat-dateSelection">
                {uniqueDates.map(date => (
                    <button
                        key={date}
                        onClick={() => handleDateChange(date)}
                        className={selectedDate === date ? 'selected' : ''}
                    >
                        <p className={`${selectedDate === date ? 'selected' : ''} dateSelection-day`}>{format(new Date(date), 'EEE dd').split(' ')[0]}</p>
                        <p className={`${selectedDate === date ? 'selected' : ''} dateSelection-hour`}>{format(new Date(date), 'EEE dd').split(' ')[1]}</p>
                    </button>
                ))}
            </article>

            <article className="chooseSeat-hourSelection">
                {availableTimes.map(time => (
                    <button
                        key={time}
                        onClick={() => handleTimeChange(time)}
                        className={selectedTime === time ? 'selected' : ''}
                    >
                        <p className="hourSelection-hour">{time}</p>
                        <p className={`${selectedTime === time ? 'selected' : ''} hourSelection-price`}>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(functions[0].precio)}</p>
                    </button>
                ))}
            </article>

            <article className="chooseSeat-buyContainer">
                <div className="buyContainer-text">
                    <p className="buyContainer-text-title">Price</p>
                    <p className="buyContainer-text-price">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalPrice)}</p>
                </div>
                <button className="buyContainer-button" onClick={()=>{goToPayments()}}>Buy ticket</button>
            </article>
        </main>
    )
}