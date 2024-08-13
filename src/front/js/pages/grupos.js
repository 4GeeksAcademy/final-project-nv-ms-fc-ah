import React from "react";
import { Navbar } from "../component/navbar";
import { CardGrupos } from "../component/Card/cardGrupos";
import { CardMisGrupos } from "../component/Card/cardMisGrupos";
import { CardCrearGrupo } from "../component/Card/cardCrearGrupo";
import "../../styles/groupCards.css";

export const Grupos = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row gy-4">
                    <div className="col-12 col-md-6 col-lg-4">
                        <CardGrupos
                            image="https://www.paiscircular.cl/wp-content/uploads/2022/01/palmar-1024x682.jpg"
                            title="Unirme a un grupo"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <CardMisGrupos
                            image="https://www.sportlife.es/uploads/s1/12/21/83/74/7-riesgos-y-lesiones-comunes-en-senderistas.jpeg"
                            title="Ver mis grupos"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <CardCrearGrupo
                            image="https://hips.hearstapps.com/hmg-prod/images/senderismo-como-practicar-01-1622803149.jpg"
                            title="Crear grupo"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
