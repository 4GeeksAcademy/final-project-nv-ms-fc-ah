import React from "react";
import Card from "../component/Card/card";

function Senderos() {
  const rutas = [
    {
      img: "https://images.unsplash.com/photo-1535479672101-8486af672be0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Cerro San Cristóbal",
      ubicacion: "Parque Metropolitano",
      longitud: "9.0 km",
      dificultad: "Moderada",
    },
    {
      img: "https://images.unsplash.com/photo-1528913010160-240d3500c209?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Torres del paine",
      ubicacion: "Región de Magallanes",
      longitud: "76.5 km",
      dificultad: "Dificil",
    },
    {
      img: "https://andeshandbook.s3.amazonaws.com/media/route_gallery/thumb600x400/1454617012336551671.jpg",
      nombre: "Salto de Apoquindo",
      ubicacion: "Parque Aguas de Ramón",
      longitud: "16.3 km",
      dificultad: "Dificil",
    },
    {
      img: "https://images.unsplash.com/photo-1535479672101-8486af672be0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Cerro San Cristóbal",
      ubicacion: "Parque Metropolitano",
      longitud: "9.0 km",
      dificultad: "Moderada",
    },
    {
      img: "https://images.unsplash.com/photo-1528913010160-240d3500c209?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Torres del paine",
      ubicacion: "Región de Magallanes",
      longitud: "76.5 km",
      dificultad: "Dificil",
    },
    {
      img: "https://andeshandbook.s3.amazonaws.com/media/route_gallery/thumb600x400/1454617012336551671.jpg",
      nombre: "Salto de Apoquindo",
      ubicacion: "Parque Aguas de Ramón",
      longitud: "16.3 km",
      dificultad: "Dificil",
    },
  ];

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="container">
          <h2>
            Rutas locales favoritas
            <span className="border-bottom fw-bolder border-3 ms-1">
              Santiago de Chile
            </span>
            <div className="d-flex flex-wrap justify-content-between mt-4">
              {rutas
                ? rutas.map((el, idx) => (
                    <Card
                      key={idx}
                      img={el.img}
                      nombre={el.nombre}
                      ubicacion={el.ubicacion}
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
