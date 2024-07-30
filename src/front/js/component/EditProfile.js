import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css';
import { GiMountains } from "react-icons/gi";
import { Context } from '../store/appContext';
const EditProfile = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    imageUrl: '',
    backgroundUrl: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController(); // Crear un AbortController
    const fetchData = async () => {
      try {
        if (store.user && store.user.id) {
          const data = await actions.userData();
          if (!abortController.signal.aborted) { // Verificar si la solicitud fue abortada
            setUserData({
              username: data.username || '',
              email: data.email || '',
              imageUrl: data.img || '',
              backgroundUrl: data.backgroundUrl || ''
            });
            setIsLoading(false);
          }
        } else {
          console.error('El ID del usuario no está disponible.');
          setMessage('No se ha podido obtener la información del usuario.');
          setMessageType('danger');
          setShowMessage(true);
          setIsLoading(false);
        }
      } catch (error) {
        if (!abortController.signal.aborted) { // Verificar si la solicitud fue abortada
          console.error('Error fetching user data:', error);
          setMessage('Error al obtener los datos del usuario.');
          setMessageType('danger');
          setShowMessage(true);
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort(); // Cancelar la solicitud cuando el componente se desmonte
    };
  }, []); // Dependencia vacía para ejecutar solo al montar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const type = e.target.dataset.type;
    if (file) {
      try {
        const result = await actions.uploadImage(file); //lamar a la accion para subir imagenes
        if (result) {
          setUserData(prevData => ({
            ...prevData,
            [type]: result.image_url
          }));
          setMessage('Imagen cargada con éxito.');
          setMessageType('success');
        } else {
          setMessage('Error al cargar la imagen.');
          setMessageType('danger');
        }
        setShowMessage(true);
      } catch (error) {
        setMessage('Error al cargar la imagen.');
        setMessageType('danger');
        setShowMessage(true);
      }
    }
  };
  const handleSave = async () => {
    try {
      const result = await actions.updateProfile({
        username: userData.username,
        email: userData.email,
        img: userData.imageUrl,
        backgroundUrl: userData.backgroundUrl
      });
      if (result) {
        alert('Perfil actualizado.');
        navigate('/UserProfile');
      } else {
        alert('Error al actualizar el perfil.');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil.');
    }
  };
  const handleGoBack = () => {
    navigate('/UserProfile');
  };
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <>
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
                <Button variant="danger" onClick={handleGoBack}>Volver a Perfil</Button>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
      <div className="background-image">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="p-4 bg-light shadow-sm">
                <Card.Body>
                  <h2 className="text-center mb-4">Editar Perfil</h2>
                  {showMessage && (
                    <Alert variant={messageType} onClose={() => setShowMessage(false)} dismissible>
                      {message}
                    </Alert>
                  )}
                  <div className="image-preview text-center mb-4">
                    <Image
                      src={userData.imageUrl || '/path/to/placeholder-profile.png'}
                      alt="Profile"
                      className={`profile-image ${userData.imageUrl ? 'loaded' : ''}`}
                    />
                  </div>
                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Nombre de Usuario</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mt-3">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formImageUrl" className="mt-3">
                      <Form.Label>Imagen de Perfil</Form.Label>
                      <Form.Control
                        type="file"
                        data-type="imageUrl"
                        onChange={handleImageChange}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-4">
                      <Button variant="secondary" onClick={handleGoBack}>Volver al Perfil</Button>
                      <Button variant="primary" onClick={handleSave}>Guardar</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default EditProfile;