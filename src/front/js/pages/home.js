import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Card from "../component/Card/card";
import { Carousel } from "../component/carousel";

export const Home = () => {
  const rutas = [
    {
      img: "https://images.unsplash.com/photo-1535479672101-8486af672be0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Cerro San Cristóbal",
      ubicaion: "Parque Metropolitano",
      longitud: "9.0 km",
      exigencia: "Moderada",
    },
    {
      img: "https://images.unsplash.com/photo-1535479672101-8486af672be0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Cerro San Cristóbal",
      ubicacion: "Parque Metropolitano",
      longitud: "9.0 km",
      exigencia: "Moderada",
    },
    {
      img: "https://images.unsplash.com/photo-1535479672101-8486af672be0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nombre: "Cerro San Cristóbal",
      ubicaion: "Parque Metropolitano",
      longitud: "9.0 km",
      exigencia: "Moderada",
    },
  ];

  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  const { actions, store } = useContext(Context);
  const { user } = store;

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("accessToken");

    if (!isLoggedIn) {
      navigate("/");
    } else {
      actions
        .userHome()
        .then(() => console.log("Datos protegidos cargados correctamente."))
        .catch((error) =>
          console.error("Error al cargar datos protegidos.", error)
        );
    }
  }, [actions, navigate]);

  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const url = process.env.BACKEND_URL + `/api/user/${user.id}`;
        try {
          const resp = await fetch(url, {
            headers: { "Content-type": "application/json" },
          });

          if (!resp.ok) {
            throw new Error(
              resp.message || `${resp.statusText}, ${resp.status}`
            );
          }

          const data = await resp.json();

          return setUserData(data);
        } catch (error) {
          console.log(`message_error: ${error.message}`);
        }
      };
      getUserData();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container-fluid text-center mt-5">
        <h1>
          {userData && (
            <p>
              Bienvenido, {userData.username.toUpperCase()} gracias por iniciar
              sesión!
            </p>
          )}
        </h1>
      </div>
      
      <Carousel />

      <div className="container-fluid mt-5">
        <div className="container">
          <h2>
            Rutas locales favoritas{" "}
            <span className="border-bottom fw-bolder border-3 ">
              Santiago de Chile
            </span>
            {rutas
              ? rutas.map((el, idx) => (
                  <Card
                    key={idx}
                    img={el.img}
                    nombre={el.nombre}
                    ubicacion={el.ubicacion}
                    longitud={el.longitud}
                    exigencia={el.exigencia}
                  />
                ))
              : "Cargando Rutas"}
          </h2>
        </div>
      </div>
    </>
  );
};
