import React from "react";

export const CardGrupos = ({ image, title }) => {
    return (
        <div className="card border border-0" style={{ width: "25%" }}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body d-flex justify-content-center">
                <a href="#" className="btn btn-success">{title}</a>
            </div>
        </div>
    );
}
