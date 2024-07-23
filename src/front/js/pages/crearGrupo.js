import React from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/crearGrupo.css";
import { FaTree } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";

export const CrearGrupo = () => {
  return (
    <div className="crear-grupo-page">
      <Navbar />

      <div className="container-fluid py-5 d-flex flex-column align-items-center">
        <h1 className="text-center mb-4 white-text">Crear un grupo</h1>
        <form className="p-4 shadow-sm rounded" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f7f7f7' }}>
          <div className="mb-3">
            <label htmlFor="staticusername" className="form-label">Nombre del grupo</label>
            <div className="input-group">
              <span className="input-group-text"><TiGroup /></span>
              <input
                type="text"
                className="form-control"
                id="staticusername"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="staticEmail" className="form-label">ID de sendero</label>
            <div className="input-group">
              <span className="input-group-text"><FaTree /></span>
              <input
                type="text"
                className="form-control"
                id="staticEmail"
                required
              />
            </div>
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-success">Crear grupo</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
