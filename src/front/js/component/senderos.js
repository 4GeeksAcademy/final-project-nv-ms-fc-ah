import React from "react";
import Card from "../component/Card/card";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router-dom";
import { senderoToken } from "./scrollToTop";


function Senderos() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="container">
          <h2>
            Rutas locales favoritas
            <span className="border-bottom fw-bolder border-3 ms-1 ">
              Santiago de Chile
            </span>
            <div
              data-bs-spy="scroll"
              className="d-flex flex-wrap justify-content-between mt-4 "
            >
              {senderoToken.rutas
                ? senderoToken.rutas.map((el, idx) => (
                  <Card
                    onClick={() => navigate(`/infoRuta/${el.nombre}`)}
                    key={idx}
                    img={el.img}
                    nombre={el.nombre}
                    ubicacion={el.direccion}
                    longitud={el.longitud}
                    exigencia={el.dificultad}
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
