import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GiMountains } from "react-icons/gi";

export const Navbar = () => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleLogout = () => {
        try {
            actions.userLogout();
            alert("Se cerró sesión correctamente.");
            navigate("/");
        } catch (error) {
            setError("Error al cerrar sesión.");
        }
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container d-flex justify-content-between align-items-center">
                <h3 className="text-start fw-bolder">
                    <span className="me-2 h1">
                        <GiMountains />
                    </span>
                    SenderosApp
                </h3>
                <ul className="navbar-nav d-flex flex-row mb-0">
                    <li className="nav-item me-3">
                        <a className="nav-link" href="#">Senderos</a>
                    </li>
                    <li className="nav-item me-3">
                        <a className="nav-link" href="#">Grupos</a>
                    </li>
                    <li className="nav-item me-3">
                        <a className="nav-link" href="#">Perfil</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/">
                            <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                        </Link>
                    </li>
                </ul>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
        </nav>
    );
};
