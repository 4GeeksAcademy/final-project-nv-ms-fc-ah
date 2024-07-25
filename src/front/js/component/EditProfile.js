import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css';
import { GiMountains } from "react-icons/gi";

const EditProfile = () => {
  // URL de Cloudinary y el preset de carga
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfle6uz4i/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'presents_ react';
  // Estado inicial del perfil del usuario
  const [user, setUser] = useState({
    name: 'Matias',
    surname: 'Sepulveda',
    email: 'jsepulveda@gmail.com',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5f-U--xmsKWKluLxeHiDT9e1zE3l2MKGLytTH2_PcWiLX2Jt9enhi-tc9gg&s',
    backgroundUrl: 'https://andeshandbook.s3.amazonaws.com/media/route_gallery/thumb600x400/1454617012336551671.jpg'
  });
  // Hook para la navegación
  const navigate = useNavigate();
  // Maneja el cambio en los campos de texto del formulario
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  // Maneja el cambio de imagen y carga la imagen en Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      try {
        // Envía la imagen a Cloudinary
        const response = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (response.ok) {
          // Actualiza el estado con la URL de la imagen cargada
          setUser({
            ...user,
            [e.target.dataset.type]: result.secure_url
          });
        } else {
          alert('Error al cargar la imagen.');
        }
      } catch (error) {
        alert('Error al cargar la imagen.');
      }
    }
  };
  // Maneja la acción de guardar los cambios del perfil
  const handleSave = async () => {
    // Crea un objeto con los datos del perfil
    const updatedProfile = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      imageUrl: user.imageUrl,
      backgroundUrl: user.backgroundUrl
    };
    try {
      // Envía los datos al backend para actualizar el perfil
      const response = await fetch('/update_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
      if (response.ok) {
        // Si la respuesta es exitosa, redirige al perfil del usuario
        alert('Perfil actualizado.');
        navigate('/UserProfile');  // Redirige al perfil del usuario
      } else {
        // Si hay un error, muestra el mensaje de error
        const result = await response.json();
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      // Muestra un mensaje de error si ocurre una excepción
      alert('Error al actualizar el perfil.');
    }
  };
  // Maneja la acción de volver al perfil del usuario
  const handleGoBack = () => {
    navigate('/UserProfile');
  };
  return (
    <>
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <Container className="d-flex justify-content-between align-items-center" >
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
      {/* Contenedor de la página de edición del perfil */}
      <div className="background-image">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="p-4 bg-light shadow-sm">
                <Card.Body>
                  <h2 className="text-center mb-4">Editar Perfil</h2>
                  <Form>
                    {/* Campo para el nombre del usuario */}
                    <Form.Group controlId="formName">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {/* Campo para el apellido del usuario */}
                    <Form.Group controlId="formSurname" className="mt-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {/* Campo para el correo electrónico del usuario */}
                    <Form.Group controlId="formEmail" className="mt-3">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {/* Campo para cargar la imagen de perfil */}
                    <Form.Group controlId="formImageUrl" className="mt-3">
                      <Form.Label>Imagen de Perfil</Form.Label>
                      <Form.Control
                        type="file"
                        data-type="imageUrl"
                        onChange={handleImageChange}
                      />
                      <Image src={user.imageUrl} alt="Profile" className="mt-2 rounded-circle" style={{ width: '150px', height: '150px' }} />
                    </Form.Group>
                    {/* Campo para cargar la imagen de fondo */}
                    <Form.Group controlId="formBackgroundUrl" className="mt-3">
                      <Form.Label>Imagen de Fondo</Form.Label>
                      <Form.Control
                        type="file"
                        data-type="backgroundUrl"
                        onChange={handleImageChange}
                      />
                      <Image src={user.backgroundUrl} alt="Background" className="mt-2" fluid />
                    </Form.Group>
                    {/* Botones para guardar los cambios o volver al perfil */}
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