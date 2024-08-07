import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await actions.userLogin(email, password);
      if (response && response.token) {
        setShowModal(true);
      }
    } catch (error) {
      setError("Error al iniciar sesión, correo o contraseña equivocados");
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log(response);
    setShowModal(true);
  };

  const handleGoogleError = (error) => {
    console.error(error);
    setError("Error al iniciar sesión con Google.");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/home");
  };

  return (
    <div className="container-fluid py-5 d-flex flex-column align-items-center background-image">
      <h1 className="text-center mb-4 white-text">Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="p-4 shadow-sm rounded form-background" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f7f7f7' }}>
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
          <button type="submit" className="btn btn-primary">Entrar</button>
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
              <h5 className="modal-title" id="modalLabel">Inicio de Sesión Exitoso</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ¡Has iniciado sesión correctamente!
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