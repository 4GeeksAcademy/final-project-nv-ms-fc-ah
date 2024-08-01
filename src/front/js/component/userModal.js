import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CardUserInfo } from '../component/Card/cardUserInfo';

const UserModal = ({ show, handleClose, users, handleAddUser }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Miembro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap justify-content-center">
                    {users.map(user => (
                        <CardUserInfo
                            key={user.id}
                            profile_picture={user.img}
                            username={user.username}
                            link_id={user.id}
                            handleAddUser={handleAddUser}
                            showAddButton={true}
                        />
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;
