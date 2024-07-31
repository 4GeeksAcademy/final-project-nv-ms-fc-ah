import React from "react";
import style from "../Card/style.module.css";
import { Link } from "react-router-dom";

export const CardGrupos = ({ image, title }) => {
    return (
        <div className={style.container_card}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body d-flex justify-content-center">
            <Link to={"/grupos/unirme"} className="nav-link" href="#">
                <a href="#" className="btn btn-success">{title}</a>
                </Link>
            </div>
        </div>
    );
}
