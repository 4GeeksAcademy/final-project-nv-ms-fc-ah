import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Card/style.module.css";

export const CardCrearGrupo = ({ image, title }) => {

    const navigate = useNavigate();

    return (
        <div className={style.container_card}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body d-flex justify-content-center">
                <Link to={"/grupos/crear-grupo"}>
                <a href="#" className="btn btn-success">{title}</a>
                </Link>
            </div>
        </div>
    );
}
