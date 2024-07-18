import React from "react";
import { GiPathDistance } from "react-icons/gi";
import { GiMountainClimbing } from "react-icons/gi";

const Card = ({ img, nombre, ubicacion, longitud, exigencia }) => {
  return (
    <div className="card mt-3" style={{ width: "350px" }}>
      <img src={img} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title fw-bolder">{nombre}</h5>
        <p className="card-text h6">{ubicacion}</p>
        <div className="d-flex justify-content-between h6 mt-4">
          <p className="fw-bolder">
            <GiPathDistance /> {longitud}
          </p>
          <p className="fw-bolder">
            <GiMountainClimbing /> {exigencia}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
