import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/landing.css";
import { GiMountains } from "react-icons/gi";
import { Footer } from "../component/footer";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid  py-3 text-center">
        <div className="d-flex justify-content-between">
          <div className="col-4 mt-1">
            <h3 className="text-start  fw-bolder">
              <span className="me-2 h1">
                <GiMountains />
              </span>
              SenderosApp
            </h3>
          </div>

          <div className="col-4 text-end mt-3">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="btn btn-primary fw-bolder border-dark btn-sm me-2 rounded-pill"
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="btn btn-success fw-bolder border-dark btn-sm rounded-pill"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>

      <div className="landing-page">
        <div className="background-container">
        </div>
      </div>
    </>
  );
};
