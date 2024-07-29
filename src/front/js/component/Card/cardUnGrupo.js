import React from "react";
import { Link } from "react-router-dom";

export const CardUnGrupo = ({ group_name, admin, link_id }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: '400px', margin: '10px' }}>
      <div className="card-body d-flex flex-column align-items-center text-center">
        <h5 className="card-title mb-2">{group_name}</h5>
        <p className="card-text mb-3">Administrador: {admin}</p>
        <Link 
          to={`/grupos/${link_id}?group_name=${encodeURIComponent(group_name)}&admin=${encodeURIComponent(admin)}`}
          className="btn btn-success"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};
