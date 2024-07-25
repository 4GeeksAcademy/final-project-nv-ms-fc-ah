import React, { useState, useContext, useEffect } from 'react'; // Importa hooks y contextos necesarios de React
import { useNavigate } from 'react-router-dom'; // Hook para navegar a otras rutas
import { Context } from '../store/appContext'; // Importa el contexto que contiene el store y las acciones
import { Container, Button } from 'react-bootstrap'; // Componentes de Bootstrap para el diseño
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap
// import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa íconos de Bootstrap
import './UserProfile.css'; // Importa los estilos específicos del componente
const UserProfile = () => {
  const { store, actions } = useContext(Context); // Extrae el store y las acciones del contexto
  const [user, setUser] = useState({ name: '', email: '', imageUrl: '' }); // Define el estado local del componente
  const [showChangePassword, setShowChangePassword] = useState(false); // Estado para controlar la visibilidad del formulario de cambio de contraseña
  const [newPassword, setNewPassword] = useState(''); // Estado para almacenar la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para almacenar la confirmación de la nueva contraseña
  const [error, setError] = useState(''); // Estado para manejar los mensajes de error
  const navigate = useNavigate(); // Hook para manejar la navegación
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Llama a la acción userHome para obtener y actualizar los datos completos del usuario
        await actions.userHome();
        setUser(store.user); // Actualiza el estado local con los datos del usuario
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setError('No se pudo obtener la información del usuario.'); // Manejo de errores
      }
    };
    const storedUsername = localStorage.getItem('username'); // Obtén el nombre de usuario de localStorage
    if (storedUsername) {
      setUser(prevState => ({ ...prevState, name: storedUsername })); // Actualiza el estado local con el nombre de usuario
    }
    fetchUserData(); // Llama a la función para obtener los datos del usuario
  }, [actions, store.user]); // Dependencias del useEffect
  const handleEditClick = () => {
    navigate('/editprofile'); // Redirige al usuario a la página de edición del perfil
  };
  const handleChangePasswordClick = () => {
    setShowChangePassword(!showChangePassword); // Alterna la visibilidad del formulario
    setError(''); // Resetea el mensaje de error
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (newPassword === confirmPassword) { // Verifica que las contraseñas coincidan
      try {
        await actions.changePassword(user.email, newPassword); // Llama a la acción para cambiar la contraseña
        console.log('Contraseña cambiada exitosamente'); // Mensaje en consola para depuración
        setShowChangePassword(false); // Oculta el formulario de cambio de contraseña
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error.message); // Manejo de errores
        setError('No se pudo cambiar la contraseña.'); // Mensaje de error
      }
    } else {
      setError('Las contraseñas no coinciden.'); // Mensaje de error si las contraseñas no coinciden
    }
  };
  const handleCancelChangePassword = () => {
    setShowChangePassword(false); // Oculta el formulario de cambio de contraseña
    setError(''); // Resetea el mensaje de error
  };
  const handleGoBack = () => {
    navigate('/home'); // Redirige al usuario a la página de inicio
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <Container>
          <a className="navbar-brand" href="#">SenderosApp</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="navbar-text me-3">Hola, {userData.username}</span> {/* Muestra el nombre del usuario */}
              </li>
              <li className="nav-item">
                <Button variant="link" onClick={handleGoBack}>Volver a Home</Button>
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
            src={user.imageUrl || "/default-profile.png"}
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
          <h2>{user.username}</h2> {/* Muestra el nombre del usuario */}
          <p>{user.email}</p> {/* Muestra el correo electrónico del usuario */}
          <Button variant="primary" className="me-2" onClick={handleEditClick}>
            Editar Perfil
          </Button>
          <Button variant="warning" onClick={handleChangePasswordClick}>
            Cambio de Clave
          </Button>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
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