import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { GiPathDistance } from 'react-icons/gi';
import CardFavorites from './Card/cardFavorites';
import { useNavigate } from 'react-router-dom';

function MisRutas() {
    const navigate = useNavigate();

    const [rutas, setRutas] = useState([])

    useEffect(() => {
        async function getRutas() {
            const url = process.env.BACKEND_URL + "/api/paths"
            try {
                const response = await fetch(url, { method: 'GET', headers: { 'Content-type': 'application/json' } })

                if (!response.ok) {
                    throw new Error(`status: ${response.status}, text: ${response.statusText}`)
                }
                const data = await response.json()
                return setRutas(data)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }
        getRutas()
    }, [rutas])

    async function handleDelete(id) {
        const url = process.env.BACKEND_URL + `/api/paths/${id}`
        try {
            const response = await fetch(url, { method: 'DELETE', headers: { 'Content-type': 'application/json' } })
            if (!response.ok) {
                throw new Error(`status: ${response.status}, text: ${response.statusText}`)
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='d-flex justify-content-between border-bottom my-5'>
                    <h3>
                        <span className='me-2'><GiPathDistance /> </span>
                        RUTAS FAVORITAS
                    </h3>

                </div>
                {rutas ?
                    <div className='d-flex flex-wrap justify-content-between mt-4'>
                        {rutas && rutas.map((ruta) => {
                            return <CardFavorites
                                key={ruta.id}
                                nombre={ruta.title_name}
                                exigencia={ruta.difficulty}
                                ubicacion={ruta.direction}
                                img={ruta.img}
                                deleteRoute={() => handleDelete(ruta.id)}
                                onClick={() => navigate(`/infoRuta/${ruta.title_name}`)}
                            />
                        })}
                    </div>
                    :
                    <p className='mt-5 text-center h1 fw bolder '>NO TIENES RUTAS FAVORITAS</p>
                }
            </div>
        </>
    )
}

export default MisRutas;
