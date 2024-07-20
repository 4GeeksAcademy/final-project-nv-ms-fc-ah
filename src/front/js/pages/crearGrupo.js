import React from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import "../../styles/crearGrupo.css";

export const CrearGrupo = () => {
    return (
        <div className="crear-grupo-page">
            <Navbar />
            <div className="form-container d-flex flex-column align-items-center mt-5">
                <form className="form bg-light p-4 shadow-sm border rounded border-2 border-success">
                    <h1 className="mb-4 fst-italic">Crear un grupo de senderistas</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Nombre del grupo</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">ID de la ruta asignada</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"></input>
                    </div>
                    <button type="submit" className="btn btn-success">Crear</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};
