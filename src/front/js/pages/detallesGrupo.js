import React from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { useParams } from "react-router-dom";


export const DetalleGrupo = () => {

    const {id} = useParams();
    console.log(id)

    return(
        <>
        <Navbar/>
        <Footer/>
        </>
    )
}