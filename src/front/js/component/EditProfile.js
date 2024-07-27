
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css';
import { GiMountains } from "react-icons/gi";
import { Context } from '../store/appContext';

const EditProfile = () => {
  const { actions, store } = useContext(Context);
  const { user } = store;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.userData();
        if (data) {
          setUserData({
            username: data.username,
            email: data.email,
            imageUrl: data.imageUrl,
            backgroundUrl: data.backgroundUrl
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [actions]);

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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'presents_react');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dfle6uz4i/image/upload', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (response.ok) {
          setUserData(prevData => ({
            ...prevData,
            [type]: result.secure_url
          }));
          setMessage('Imagen cargada con éxito.');
          setMessageType('success');
          setShowMessage(true);
        } else {
          setMessage('Error al cargar la imagen.');
          setMessageType('danger');
          setShowMessage(true);
        }
      } catch (error) {
        setMessage('Error al cargar la imagen.');
        setMessageType('danger');
        setShowMessage(true);
      }
    }
  };

  const handleSave = async () => {
    try {
      const result = await actions.updateProfile(userData);
      if (result) {
        alert('Perfil actualizado.');
        navigate('/UserProfile');
      } else {
        alert('Error al actualizar el perfil.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil.');
    }
  };

  const handleGoBack = () => {
    navigate('/UserProfile');
  };

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
                    <Form.Group controlId="formBackgroundUrl" className="mt-3">
                      <Form.Label>Imagen de Fondo</Form.Label>
                      <Form.Control
                        type="file"
                        data-type="backgroundUrl"
                        onChange={handleImageChange}
                      />
                    </Form.Group>
                    <div className="image-preview mt-2">
                      <Image
                        src={userData.backgroundUrl || '/path/to/placeholder-background.png'}
                        alt="Background"
                        className="background-preview"
                      />
                    </div>
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


