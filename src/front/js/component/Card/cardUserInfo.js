import React from "react";

export const CardUserInfo = ({ profile_picture, username, link_id, isMember, onAddUser }) => {
    return (
        <div className="card m-2" style={{ width: "18rem" }}>
            <img src={profile_picture} className="card-img-top" alt={username} />
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                {/* Render the button only if the user is not a member */}
                {!isMember && (
                    <button className="btn btn-primary" onClick={() => onAddUser(link_id)}>
                        Añadir usuario al grupo
                    </button>
                )}
            </div>
        </div>
    );
};
