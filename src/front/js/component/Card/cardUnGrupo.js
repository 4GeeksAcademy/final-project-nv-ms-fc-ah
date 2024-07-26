import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Card/style.module.css";

export const CardUnGrupo = ({ image, group_name, admin, button  }) => {

    return (
        <div className={style.container_card}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body d-flex justify-content-center">
                <h5 class="card-title">{group_name}</h5>
                <p class="card-text"> Administrador: {admin}</p>
                <Link to={"/grupos/<string:group_id>"}>
                <a href="#" className="btn btn-success">Ver detalles {button}</a>
                </Link>
            </div>
        </div>
    );
}