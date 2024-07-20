import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./navbar";
import { GiMountaintop } from "react-icons/gi";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

function InfoRutas() {
  const { nombre, direccion, longitud, dificultad, lat, lng } = useParams();

  console.log(typeof Number(lat));

  const tokenApiGoogle = {
    token: "AIzaSyCKwEkukUHhvcr33z6qTgsWBCxq-HOYBgI",
    idMap: "786130161ea7eb76",
  };
  const position = { lat: Number(lat), lng: Number(lng) };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-start">
          <span className="fw-bolder border-bottom ms-3">{nombre}</span>
          <span className="ms-3">
            <GiMountaintop />
          </span>
        </h2>

        <div>
          <APIProvider apiKey={tokenApiGoogle.token}>
            <div className="container-fluid mt-5 ">
              <div className="mt-5" style={{ height: "600px", width: "600px" }}>
                <Map zoom={10} center={position} mapId={tokenApiGoogle.idMap}>
                  <AdvancedMarker
                    position={position}
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
                      position={position}
                      onCloseClick={() => setOpen(false)}
                    >
                      <p className="h2 text-center mt-5">
                        <GiMountaintop />
                        <span className="fw-bolder h4 me-2">SenderosApp</span>
                      </p>
                      <p className="text-center">Ruta: {nombre}</p>
                    </InfoWindow>
                  )}
                </Map>
              </div>
            </div>
          </APIProvider>
        </div>
      </div>
    </>
  );
}

export default InfoRutas;
