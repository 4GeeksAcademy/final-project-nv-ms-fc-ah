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
import Clima from "./Card/CardClima";
import Gemini from "./Card/Gemini";


function InfoRutas() {
  const { nombre } = useParams();

  const [open, setOpen] = useState(false);
  const [ruta, setRuta] = useState()
  const [coordenadas, setCoordenadas] = useState()
  const [token, setToken] = useState()


  //mapa y rutas
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
      <div className={style.container_infoRutas}>
        <div className={style.container_infoClima}>
          {ruta && <Clima city={ruta && ruta.direccion} img={ruta && ruta.img} />}
        </div>

        <div className={style.container_infoMap}>
          <div className="px-4 mx-2">
            <p className="lh-base"> Esta ruta está ubicada cerca de la ciudad de <span className="fw-bolder">{ruta && ruta.direccion} </span>
              su nivel de exigencia es <span className="fw-bolder"> {ruta && ruta.dificultad} </span>
              la distancia del sendero es de  <span className="fw-bolder">{ruta && ruta.longitud}, </span>
              las coordenadas para encontrar esta ruta en el mapa son las siguientes
              Latitud: <span className="fw-bolder">{coordenadas && coordenadas.lat} </span>
              Longitud: <span className="fw-bolder">{coordenadas && coordenadas.lng}</span>.
            </p>
            <div className="border border-black rounded text-center">
              <h3 className="text-secondary fw-bold pt-3" >Recomendaciones</h3>
              {ruta && <Gemini dificultad={ruta && ruta.dificultad} distancia={ruta && ruta.longitud} ubicacion={ruta && ruta.direccion} />}
            </div>
          </div>

          <div className={style.container_mapa}>
            {ruta ? (<APIProvider apiKey={token && token.token}>
              <div className={style.mapa}>
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

        </div>

      </div>
    </>

  );
}

export default InfoRutas;
