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
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h3 className="navbar-brand fw-bolder">
          <span className="me-2 h1">
            <GiMountains />
          </span>
          SenderosApp
        </h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex d-lg-flex flex-column flex-lg-row align-items-end align-items-lg-center">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/senderos"} className="nav-link">
                Senderos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/mis-rutas"} className="nav-link">
                Favoritos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/grupos"} className="nav-link">
                Grupos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/userprofile" className="nav-link">
                Perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </nav>
  );
};
