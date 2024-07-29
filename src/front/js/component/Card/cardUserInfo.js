import React from "react";

export const CardUserInfo = ({ profile_picture, username, role, link_id }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: '300px', margin: '10px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={profile_picture} className="img-fluid rounded-start" alt={username} style={{ maxHeight: '100px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column align-items-center text-center">
            <h5 className="card-title mb-2" style={{ fontSize: '1rem' }}>{username}</h5>
            <p className="card-text mb-2" style={{ fontSize: '0.875rem', color: 'gray' }}>{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
