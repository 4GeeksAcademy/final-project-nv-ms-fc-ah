import React, { useEffect, useState } from "react";
import { matchPath, useParams } from "react-router-dom";
import { Navbar } from "./navbar";
import { senderoToken } from "./scrollToTop";
import style from './Card/style.module.css'
import { GiMountaintop, GiPathDistance } from "react-icons/gi";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";


function InfoRutas() {
  const { nombre } = useParams();

  const [open, setOpen] = useState(false);
  const [ruta, setRuta] = useState()
  const [coordenadas, setCoordenadas] = useState()
  const [token, setToken] = useState()


  useEffect(() => {
    senderoToken.rutas.filter(el => {
      if (el.nombre === nombre) {
        setRuta({ ...el })
        setCoordenadas({ lat: el.lat, lng: el.lng })
      }
    })

    if (senderoToken.tokenMap) {
      setToken({ ...senderoToken.tokenMap })
    }
  }, [])

  return (
    <>
      <Navbar />
      <h1 className="text-center my-5">
        <span className="fw-bolder ms-3">{ruta && ruta.nombre}</span>
        <span> <GiPathDistance /> </span>
      </h1>
      <div className={style.content_infoRuta}>

        <div className={style.img_infoRuta}>
          <img className={style.img_content} src={ruta && ruta.img} />
        </div>

        <div className={style.datos_infoRuta}>
          <h3 className="fw-bold">INFORMACION DE RUTA</h3>
          <p>Ubicacion: <span className="text-secondary">{ruta && ruta.direccion}</span></p>
          <p>Nivel de Exigencia: <span className="text-secondary"> {ruta && ruta.dificultad}</span></p>
          <p>Distancia de sendero: <span className="text-secondary">{ruta && ruta.longitud}</span></p>
          <p>Latitud: <span className="text-secondary">{coordenadas && coordenadas.lat}</span></p>
          <p>Longitud: <span className="text-secondary">{coordenadas && coordenadas.lng}</span></p>
        </div>

        <div className={style.map_infoRuta}>
          {ruta ? (<APIProvider apiKey={token && token.token}>
            <div className={style.map}>
              <Map zoom={10} center={coordenadas ? coordenadas : ''} mapId={token && token.token}>
                <AdvancedMarker
                  position={coordenadas ? coordenadas : <div>Esperando coordenadas...</div>}
                  onClick={() => setOpen(true)}
                >
                  <Pin
                    background={"red"}
                    borderColor={"black"}
                    glyphColor={"black"}
                  />
                </AdvancedMarker>
                {open && (
                  <InfoWindow
                    position={coordenadas ? coordenadas : <div>Esperando coordenadas...</div>}
                    onCloseClick={() => setOpen(false)}
                  >
                    <p className="h2 text-center">
                      <GiMountaintop />
                      <span className="fw-bolder h4 me-2">SenderosApp</span>
                    </p>
                    <p className="text-center">Ruta: {ruta && ruta.nombre}</p>
                  </InfoWindow>
                )}
              </Map>
            </div>

          </APIProvider>) : <div>Cargando mapa...</div>}
        </div>
      </div >
    </>
  );
}

export default InfoRutas;
