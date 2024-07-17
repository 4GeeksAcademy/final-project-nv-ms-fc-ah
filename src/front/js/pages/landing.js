import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
export const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="container-fluid py-5 text-center">
            <div className="row">
                <div className="col-12">
                    <h1>SenderosApp</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 text-center">
                    <button type="button" onClick={() => navigate("/login")} className="btn btn-primary btn-lg me-5">Iniciar Sesión</button>
                    <button type="button" onClick={() => navigate("/register")} className="btn btn-success btn-lg">Registrarse</button>
                </div>
            </div>
        </div>
    );
};