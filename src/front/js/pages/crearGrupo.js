import React, {useState, useContext} from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/crearGrupo.css";
import { FaTree } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";

export const CrearGrupo = () => {

  const [groupName, setGroupName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const { actions } = useContext(Context)

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await actions.userCreateGroup(groupName);
      if (response.groupName) {
        setShowModal(true);
      }
    } catch (error) {
      setError("Error al crear grupo.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/grupos");
  };

  return (
    <div className="crear-grupo-page">
      <Navbar />

      <div className="container-fluid py-5 d-flex flex-column align-items-center">
        <h1 className="text-center mb-4 white-text">Crear un grupo</h1>
        <form onSubmit={handleCreateGroup} className="p-4 shadow-sm rounded" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f7f7f7' }}>
          <div className="mb-3">
            <label htmlFor="staticusername" className="form-label">Nombre del grupo</label>
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

        {/* Modal */}
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
      <Footer />
    </div>
  );
};
