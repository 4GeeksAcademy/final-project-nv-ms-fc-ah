import React from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { CardUnGrupo } from "../component/Card/cardUnGrupo";


export const VerMisGrupos = () => {


    return (
        <>
        <Navbar/>
        <CardUnGrupo
        image = {img}
        title = {group_name}
        admin = {admin_name}
        />
        <Footer/>
        </>
    )
}

