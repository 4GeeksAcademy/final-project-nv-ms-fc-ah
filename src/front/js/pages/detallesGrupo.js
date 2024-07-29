import React from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { useLocation, useParams } from "react-router-dom";


export const DetalleGrupo = () => {

    const {id} = useParams();
    const location = useLocation(); // Obtén la ubicación actual
    const { group_name, admin } = location.state || {}; // Recupera los datos enviados

    console.log("nombre grupo" + group_name)
    console.log("admin" + admin)

    return(
        <>
        <Navbar/>

        <div>
            <h1>Detalles del Grupo</h1>
            <p>ID del grupo: {id}</p>
            <p>Nombre del grupo: {group_name}</p>
            <p>Administrador: {admin}</p>
        </div>


        <Footer/>
        </>
    )
}