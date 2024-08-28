import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";

function Clima({ city, img = 'https://fastly.picsum.photos/id/190/2048/1365.jpg?hmac=NWS1_X_JJ-Edi-9SZRhNwHyjKt1nECckxrGLS8_idjY' }) {
    const [clima, setClima] = useState([])

    //api clima
    useEffect(() => {
        async function weather() {
            const url = `https://api.weatherapi.com/v1/current.json?key=a20341041fd14268b8e211502242708&q=${city}&aqi=no`;
            const options = {
                method: 'GET',
                headers: { "Content-type": "application/json" }
            }
            try {
                const res = await fetch(url, options);
                if (!res.ok) {
                    throw new Error({ message: `${res.statusText}, ${res.status}` })
                }
                const result = await res.json()
                setClima(result)
            } catch (error) {
                console.log({ error })
            }
        }
        weather()
    }, [])

    clima && console.log(clima)

    return (
        <div className="card mt-3" style={{
            maxWidth: '500px', height: '100%'
        }}>
            <div className="card-body">
                <h2 className='text-center  fw-bolder'>Clima<span><img src={clima.current && clima.current.condition.icon} /> </span> </h2>
                <div className='d-flex justify-content-between'>
                    <p className="h6">{clima.location && clima.location.name}</p>
                    <span><FaLocationDot size={25} color='darkred' /></span>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className=' h6'>Temperatura </p>
                    <p className='bg-dark p-1  rounded-pill text-white'>{clima.current && clima.current.temp_c}° C</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='h6'>Rafagas </p>
                    <p className='bg-dark p-1  rounded-pill text-white'>{clima.current && clima.current.gust_kph} Km/h</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='h6'>Viento </p>
                    <p className='bg-dark p-1  rounded-pill text-white'>{clima.current && clima.current.wind_kph} Km/h</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='h6'>Humedad Actual </p>
                    <p className='bg-dark p-1  rounded-pill text-white'>{clima.current && clima.current.humidity} %</p>
                </div>
                <img src={img} className="card-img-bottom rounded" alt="senderosApp" />
            </div>
        </div >
    )


}


export default Clima