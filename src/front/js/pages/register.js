import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';

export const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await actions.userRegister(email, password, username);
      if (response.email) {
        setShowModal(true);
      }
    } catch (error) {
      setError("Error al registrarse.");
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log(response);
    setShowModal(true);
  };

  const handleGoogleError = (error) => {
    console.error(error);
    setError("Error al registrarse con Google.");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="container-fluid py-5 d-flex flex-column align-items-center background-image">
      <h1 className="text-center mb-4 white-text">Regístrate</h1>
      <form onSubmit={handleRegister} className="p-4 shadow-sm rounded" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f7f7f7' }}>
        <div className="mb-3">
          <label htmlFor="staticusername" className="form-label">Nombre de usuario</label>
          <div className="input-group">
            <span className="input-group-text"><FaUser /></span>
            <input
              type="text"
              className="form-control"
              id="staticusername"
              placeholder="Usuario"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="staticEmail" className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              id="staticEmail"
              placeholder="email@ejemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Contraseña</label>
          <div className="input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </div>
        <div className="d-grid mb-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            logo={<FaGoogle />}
          />
        </div>
      </form>
      <Link to="/" className="mt-3 text-center white-text">Volver al inicio</Link>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="modalLabel" aria-hidden={!showModal} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registro Exitoso</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ¡Te has registrado correctamente!
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};