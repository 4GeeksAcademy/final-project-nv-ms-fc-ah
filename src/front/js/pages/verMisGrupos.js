import React, {useEffect} from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { CardUnGrupo } from "../component/Card/cardUnGrupo";



export const VerMisGrupos = (img, group_name, admin_name) => {

    


    return (
        <>
        <Navbar/>
        <CardUnGrupo
        image = {img}
        title = {group_name}
        admin = {admin_name}
        /*   link = {} */
        />
        <Footer/>
        </>
    )
}

