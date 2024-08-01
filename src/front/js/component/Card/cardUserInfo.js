import React from 'react';
import "../../../styles/cardUserInfo.css";
import PropTypes from 'prop-types';

export const CardUserInfo = ({ profile_picture, username, role, link_id, handleAddUser, showAddButton, handleRemoveUser, showRemoveButton }) => {
    // Debug log for the props received
    console.log('CardUserInfo rendered with:', { profile_picture, username, role, link_id, showAddButton, showRemoveButton });

    return (
        <div className="card card-user-info">
            <img src={profile_picture} alt={username} />
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                {role && <p className="card-text text-secondary fs-6 text">{role}</p>}
                
                
                {showAddButton && (
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            console.log('Adding user with ID:', link_id); // Debugging line
                            handleAddUser(link_id);
                        }}
                    >
                        Añadir usuario
                    </button>
                )}

                {showRemoveButton && (
                    <button 
                        className="btn btn-danger"
                        onClick={() => {
                            console.log('Removing user with ID:', link_id); // Debugging line
                            handleRemoveUser(link_id);
                        }}
                    >
                        Expulsar miembro
                    </button>
                )}
            </div>
        </div>
    );
};

CardUserInfo.propTypes = {
    profile_picture: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string,
    link_id: PropTypes.number.isRequired,
    handleAddUser: PropTypes.func,
    showAddButton: PropTypes.bool,
    handleRemoveUser: PropTypes.func,
    showRemoveButton: PropTypes.bool
};
