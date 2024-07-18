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
  );
};

export default Card;
