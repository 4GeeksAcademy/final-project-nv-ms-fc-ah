import React, { useState } from "react";
import Card from "../component/Card/card";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router-dom";
import { senderoToken } from "./scrollToTop";


function Senderos() {
  const navigate = useNavigate();
  const [icon, setIcon] = useState(false)

  const postRoute = async (difficulty, direction, img, lat, lng, name) => {
    const url = process.env.BACKEND_URL + "/api/paths";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: difficulty, direction: direction, img: img, lat: lat, lng: lng, title_name: name })

      })
      if (!response.ok) {
        throw new Error(`status: ${response.status}, text: ${response.statusText}`)
      }
      const data = response.json()
      console.log(data)
      return data;
    } catch (error) {
      console.log(`El error es: ${error}`)
    }

  }



  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="container">
          <h2>
            Rutas Disponibles en
            <span className="fw-bolder ms-2">
              Chile
            </span>
            <div
              data-bs-spy="scroll"
              className="d-flex flex-wrap justify-content-between mt-4 "
            >
              {senderoToken.rutas
                ? senderoToken.rutas.map((el, idx) => (
                  <Card
                    key={idx}
                    img={el.img.toString()}
                    nombre={el.nombre}
                    ubicacion={el.direccion}
                    longitud={el.longitud}
                    exigencia={el.dificultad}
                    onClick={() => navigate(`/infoRuta/${el.nombre}`)}
                    addRoute={() => postRoute(el.dificultad, el.direccion, el.img, el.lat, el.lng, el.nombre)}
                  />
                ))
                : "Cargando Rutas"}
            </div>
          </h2>
        </div>
      </div>

    </>
  );
}
export default Senderos;
