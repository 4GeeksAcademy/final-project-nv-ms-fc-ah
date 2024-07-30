import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.css';
import { GiMountains } from "react-icons/gi";
const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { actions, store } = useContext(Context);
  const { user } = store;
  const navigate = useNavigate();
  const didFetchData = useRef(false);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('accessToken');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    if (!didFetchData.current) {
      didFetchData.current = true;
      actions.userData()
        .then(data => setUserData(data))  // Asegúrate de que todos los datos se almacenan aquí
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error.message);
        });
    }
  }, [actions, navigate]);
  const handleEditClick = () => {
    navigate('/editprofile');
  };
  const handleChangePasswordClick = () => {
    setShowChangePassword(!showChangePassword);
    setError('');
    setSuccessMessage('');
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        await actions.changePassword(user.email, newPassword);
        console.log('Contraseña cambiada exitosamente');
        setSuccessMessage('La contraseña ha sido cambiada con éxito.');
        setShowChangePassword(false);
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error.message);
        setError('No se pudo cambiar la contraseña.');
      }
    } else {
      setError('Las contraseñas no coinciden.');
    }
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleCancelChangePassword = () => {
    setShowChangePassword(false);
    setError('');
  };
  const handleGoBack = () => {
    navigate('/home');
  };
  const closeMessage = () => {
    setError('');
    setSuccessMessage('');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <Container className="d-flex justify-content-between align-items-center">
          <h3 className="text-start fw-bolder d-flex align-items-center">
            <span className="me-2 h1">
              <GiMountains />
            </span>
            SenderosApp
          </h3>
          <div className="collapse navbar-collapse d-flex justify-content-end">
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <span className="navbar-text me-3">Hola, {userData?.username || 'Usuario'}</span>
              </li>
              <li className="nav-item">
                <Button variant="danger" onClick={handleGoBack} className="ms-auto me-3">
                  Volver a Home
                </Button>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
      <div className="container user-profile mt-5">
        <div className="profile-header position-relative">
          <img
            src="https://andeshandbook.s3.amazonaws.com/media/route_gallery/thumb600x400/1454617012336551671.jpg"
            alt="Background"
            className="img-fluid w-100 profile-bg"
          />
          <img
            src={userData?.img || "/default-profile.png"}
            alt="User"
            className="profile-img rounded-circle position-absolute"
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        <div className="profile-info text-center mt-4">
          <h2>{userData?.username}</h2>
          <p>{userData?.email}</p>
          <Button variant="primary" className="me-2" onClick={handleEditClick}>
            Editar Perfil
          </Button>
          <Button variant="warning" onClick={handleChangePasswordClick}>
            Cambio de Clave
          </Button>
        </div>
        {error && (
          <div className="alert alert-danger mt-3 d-flex justify-content-between align-items-center">
            {error}
            <Button variant="light" size="sm" onClick={closeMessage}>X</Button>
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success mt-3 d-flex justify-content-between align-items-center">
            {successMessage}
            <Button variant="light" size="sm" onClick={closeMessage}>X</Button>
          </div>
        )}
        {showChangePassword && (
          <div className="change-password-form mt-4">
            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button type="submit" variant="success" className="me-2">
                  Confirmar
                </Button>
                <Button type="button" variant="secondary" onClick={handleCancelChangePassword}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserProfile;