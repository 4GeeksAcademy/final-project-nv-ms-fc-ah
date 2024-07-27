import React from "react";
import style from "../Card/style.module.css";

export const CardUnGrupo = ({ image, group_name, admin, button, link_id }) => {

    return (
        <div className={style.container_card}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body d-flex justify-content-center">
                <h5 className="card-title">{group_name}</h5>
                <p className="card-text"> Administrador: {admin}</p>                
                <a href={link_id} className="btn btn-success">Ver detalles {button}</a>
            </div>
        </div>
    );
}