import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const CardCrearGrupo = ({ image, title }) => {

    const navigate = useNavigate();

    return (
        <div className="card border border-0" style={{ width: "25%" }}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body d-flex justify-content-center">
                <Link to={"/grupos/crear-grupo"}>
                <a href="#" className="btn btn-success">{title}</a>
                </Link>
            </div>
        </div>
    );
}
