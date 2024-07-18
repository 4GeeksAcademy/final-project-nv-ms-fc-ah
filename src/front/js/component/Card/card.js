import React from "react";
import { GiPathDistance } from "react-icons/gi";
import { GiMountainClimbing } from "react-icons/gi";
import style from "../Card/style.module.css";

const Card = ({ img, nombre, ubicacion, longitud, exigencia }) => {
  return (
    <div className={style.container_card}>
      <div className={style.card_img}>
        <img src={img} alt="" />
      </div>
      <div>
        <div className={style.card_text_title}>
          <p className="fw-bolder"> {nombre} </p>
          <p>{ubicacion}</p>
        </div>
        <div className={style.card_text_footer}>
          <p>{longitud}</p>
          <p>{exigencia}</p>
        </div>
      </div>
    </div>

    /*  <div className="card mt-3" style={{ width: "350px" }}>
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
    </div> */
  );
};

export default Card;
