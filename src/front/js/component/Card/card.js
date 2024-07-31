import React, { useState } from "react";
import { GiPathDistance } from "react-icons/gi";
import { GiMountainClimbing } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import style from "../Card/style.module.css";


const Card = ({ img, nombre, ubicacion, longitud, exigencia, onClick, addRoute, iconfunction, icon }) => {
  const [activeBtn, setActiveBtn] = useState(false)

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
        <div className={style.card_seccion_btn}>
          <span onClick={addRoute}>
            <span onClick={() => setActiveBtn(true)}>{activeBtn ? <FaBookmark size={20} color="darkblue" /> : <FaRegBookmark size={20} />}</span>
          </span>
          <p onClick={onClick} className="btn btn-dark rounded-pill fw-bolder h5">Ver Mas</p>
        </div>
      </div>
    </div >
  );
};

export default Card;
