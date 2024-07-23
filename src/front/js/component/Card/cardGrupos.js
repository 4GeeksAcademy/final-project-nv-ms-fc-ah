import React from "react";
import style from "../Card/style.module.css";

export const CardGrupos = ({ image, title }) => {
    return (
        <div className={style.container_card}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body d-flex justify-content-center">
                <a href="#" className="btn btn-success">{title}</a>
            </div>
        </div>
    );
}
