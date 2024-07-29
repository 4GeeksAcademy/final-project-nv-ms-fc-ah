import React from "react";
import style from "../Card/style.module.css";
import { Link } from "react-router-dom";

export const CardUnGrupo = ({ group_name, admin, link_id }) => {
    return (
        <div className={style.container_card}>
            <div className="card-body d-flex justify-content-center">
                <h5 className="card-title">{group_name}</h5>
                <p className="card-text"> Administrador: {admin}</p>
                <Link 
                    to={{
                        pathname: `/grupos/${link_id}`,
                        state: {
                            group_name: group_name,
                            admin: admin
                        }
                    }}
                    className="btn btn-success" // Mueve el estilo del botón aquí
                >
                    Ver detalles
                </Link>                
            </div>
        </div>
    );
}
