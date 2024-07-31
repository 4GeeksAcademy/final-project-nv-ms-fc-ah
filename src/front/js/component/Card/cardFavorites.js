import React, { useState } from "react";
import { GiMountainClimbing } from "react-icons/gi";
import { FaTrashAlt } from "react-icons/fa";
import style from "../Card/style.module.css";


const CardFavorites = ({ img, nombre, ubicacion, longitud, exigencia, onClick, deleteRoute, iconfunction, icon }) => {
    const [activeBtn, setActiveBtn] = useState(false)

    return (
        <div className={style.container_card_favorites}>
            <div className={style.card_img_favorites}>
                <img src={img} alt="" />
            </div>
            <div>
                <div className={style.card_text_title_favorites}>
                    <p className="fw-bolder h6 "> {nombre} </p>
                </div>
                <div className={style.card_text_footer_favorites}>
                    <p>
                        {ubicacion}
                    </p>
                    <p className="fw-bolder">
                        <span className="me-2">
                            <GiMountainClimbing />
                        </span>
                        {exigencia}
                    </p>
                </div>
                <div className={style.card_seccion_btn_favorites}>
                    <p className="h5 ">
                        <span onClick={deleteRoute}  ><FaTrashAlt color="darkred" /></span>
                    </p>
                    <p onClick={onClick} className="btn btn-dark btn-sm rounded-pill fw-bolder h5">Mapa</p>
                </div>
            </div>
        </div >
    );
};

export default CardFavorites;
