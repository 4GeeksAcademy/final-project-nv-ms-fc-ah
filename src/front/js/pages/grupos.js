import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { CardGrupos } from "../component/Card/cardGrupos";
import { CardMisGrupos } from "../component/Card/cardMisGrupos";
import { CardCrearGrupo } from "../component/Card/cardCrearGrupo";
import "../../styles/groupCards.css";


export const Grupos = () => {



    return (
        <>
            <Navbar />
            <div className="cards-container">
                <div className="d-flex justify-content-around mt-5 gx-5">
                    <CardGrupos
                        image="https://www.paiscircular.cl/wp-content/uploads/2022/01/palmar-1024x682.jpg"
                        title="Unirme a un grupo"
                    />
                    <CardMisGrupos
                        image="https://www.sportlife.es/uploads/s1/12/21/83/74/7-riesgos-y-lesiones-comunes-en-senderistas.jpeg"
                        title="Ver mis grupos"
                    />
                    <CardCrearGrupo
                        image="https://hips.hearstapps.com/hmg-prod/images/senderismo-como-practicar-01-1622803149.jpg"
                        title="Crear grupo"
                    />
                </div>
            </div>
        </>
    );
};