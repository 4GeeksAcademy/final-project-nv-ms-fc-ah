import React, { useState, useContext, useEffect, useRef } from "react";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/crearGrupo.css";
import { TiGroup } from "react-icons/ti";

export const CrearGrupo = () => {
    const [groupName, setGroupName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);

    const didFetchData = useRef(false);
    const { user } = store;
    //console.log("store",user)
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('accessToken');
        if (!isLoggedIn) {
            navigate('/');
            return;
        }

        // Debugging
        //console.log("useEffect triggered. User:", user);

        if (!didFetchData.current) {
            didFetchData.current = true;
            if (!user) {
                actions.userHome()
                    .then(data => {
                        // Debugging
                        console.log("User data fetched and set, from user home:", data);
                    })
                    .catch(error => {
                        console.error('Error al obtener los datos del usuario:', error.message);
                        setError('No se pudo obtener la información del usuario.');
                    });
            }
        }
    }, [navigate, actions]);

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            console.log("Calling userCreateGroup with:", groupName);
            const response = await actions.userCreateGroup(groupName);
            if (response.name) {
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error in handleCreateGroup:", error);
            setError("Error al crear grupo.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/grupos/mis-grupos");
    };

    return (
        <div className="crear-grupo-page">
            <Navbar />
            <div className="container-fluid py-5 d-flex flex-column align-items-center">
                <h1 className="text-center mb-4 white-text">Crear un grupo</h1>
                <form onSubmit={handleCreateGroup} className="p-4 shadow-sm rounded" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f7f7f7' }}>
                    <div className="mb-3">
                        <label htmlFor="staticgroupname" className="form-label">Nombre del grupo</label>
                        <div className="input-group">
                            <span className="input-group-text"><TiGroup /></span>
                            <input
                                type="text"
                                className="form-control"
                                id="staticgroupname"
                                onChange={(e) => setGroupName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-success">Crear grupo</button>
                    </div>
                </form>

                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="modalLabel" aria-hidden={!showModal} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalLabel">Registro Exitoso</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ¡Grupo creado correctamente!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
