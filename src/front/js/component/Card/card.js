import React from "react";
import { GiPathDistance } from "react-icons/gi";
import { GiMountainClimbing } from "react-icons/gi";
import style from "../Card/style.module.css";

const Card = ({ img, nombre, ubicacion, longitud, exigencia, onClick }) => {
  return (
    <div onClick={onClick} className={style.container_card}>
      <div className={style.card_img}>
        <img src={img} alt="" />
      </div>
      <div>
        <div className={style.card_text_title}>
          <p className="fw-bolder"> {nombre} </p>
          <p>{ubicacion}</p>
        </div>
        <div className={style.card_text_footer}>
          <p className="fw-bolder">
            <span className="me-2">
              <GiPathDistance />
            </span>
            {longitud}
          </p>
          <p className="fw-bolder">
            <span className="me-2">
              <GiMountainClimbing />
            </span>
            {exigencia}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
