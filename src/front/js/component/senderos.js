import React from "react";
import Card from "../component/Card/card";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router-dom";

function Senderos() {
  const navigate = useNavigate();

  const rutas = [
    {
      img: "https://images.unsplash.com/photo-1535479672101-8486af672be0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Cerro San Cristóbal",
      direccion: "Parque Metropolitano",
      longitud: "9.0 km",
      dificultad: "Moderada",
      lat: -33.41930816410475,
      lng: -70.63128913243435,
    },
    {
      img: "https://images.unsplash.com/photo-1528913010160-240d3500c209?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Torres del paine",
      direccion: "Región de Magallanes",
      longitud: "76.5 km",
      dificultad: "Dificil",
      lat: -50.94220448676759,
      lng: -73.40672352998607,
    },
    {
      img: "https://andeshandbook.s3.amazonaws.com/media/route_gallery/thumb600x400/1454617012336551671.jpg",
      nombre: "Salto de Apoquindo",
      direccion: "Parque Aguas de Ramón",
      longitud: "16.3 km",
      dificultad: "Dificil",
      lat: -33.43235072908738,
      lng: -70.51940046464088,
    },
    {
      img: "https://images.unsplash.com/photo-1535479672101-8486af672be0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Cerro San Cristóbal",
      direccion: "Parque Metropolitano",
      longitud: "9.0 km",
      dificultad: "Moderada",
      lat: -33.41930816410475,
      lng: -70.63128913243435,
    },
    {
      img: "https://images.unsplash.com/photo-1528913010160-240d3500c209?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Torres del paine",
      direccion: "Región de Magallanes",
      longitud: "76.5 km",
      dificultad: "Dificil",
      lat: -50.94220448676759,
      lng: -73.40672352998607,
    },
    {
      img: "https://andeshandbook.s3.amazonaws.com/media/route_gallery/thumb600x400/1454617012336551671.jpg",
      nombre: "Salto de Apoquindo",
      direccion: "Parque Aguas de Ramón",
      longitud: "16.3 km",
      dificultad: "Dificil",
      lat: -33.43235072908738,
      lng: -70.51940046464088,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="container">
          <h2>
            Rutas locales favoritas
            <span className="border-bottom fw-bolder border-3 ms-1">
              Santiago de Chile
            </span>
            <div
              data-bs-spy="scroll"
              className="d-flex flex-wrap justify-content-between mt-4"
            >
              {rutas
                ? rutas.map((el, idx) => (
                    <Card
                      onClick={() =>
                        navigate(
                          `/infoRuta/${el.nombre}/${el.direccion}/${el.longitud}/${el.dificultad}/${el.lat}/${el.lng}`
                        )
                      }
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
