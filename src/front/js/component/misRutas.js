import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './footer';
import { GiPathDistance } from 'react-icons/gi';
import Card from './Card/card';

function MisRutas() {

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

    }, [])

    if (!rutas) {
        return <div className="container text-center mt-5">
            <h2>Cargando rutas...</h2>
        </div>
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='d-flex justify-content-between border-bottom my-5'>
                    <h3 className='text-start '>Has guardado las siguientes rutas</h3>
                    <span className='h2'>  <GiPathDistance /> </span>
                </div>
                <div>
                    <ul>
                        {rutas && rutas.map((ruta) => <li key={ruta.id}><a href='#'>{ruta.title_name}</a></li>)}
                    </ul>
                </div>
             {/*    <div className='d-flex flex-wrap justify-content-between mt-4'>
                    {rutas && rutas.map((ruta) => {
                        return <Card nombre={ruta.title_name} exigencia={ruta.difficulty} ubicacion={ruta.direction} img={ruta.img} longitud={ruta} />
                    })}
                </div> */}

            </div>
            {/*   <Footer /> */}
        </>
    )
}

export default MisRutas;
