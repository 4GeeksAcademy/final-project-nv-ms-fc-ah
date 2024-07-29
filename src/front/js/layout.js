import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Grupos } from "./pages/grupos";
import { CrearGrupo } from "./pages/crearGrupo";
import { DetalleGrupo } from "./pages/detallesGrupo";
import { Protegido } from "./component/protegido";
import injectContext from "./store/appContext";

import Senderos from "./component/senderos";
import InfoRutas from "./component/infoRutas";
import UserProfile from "./component/UserProfile";
import EditProfile from "./component/EditProfile";
import { VerMisGrupos } from "./pages/verMisGrupos";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Protegido />}>
            <Route element={<Home />} path="/home" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<Senderos />} path="/senderos" />
            <Route element={<Grupos />} path="/grupos" />
            <Route element={<CrearGrupo />} path="/grupos/crear-grupo" />
            <Route element={<VerMisGrupos />} path="/grupos/mis-grupos" />
            <Route element={<DetalleGrupo />} path="/grupos/:id" />
            <Route element={<UserProfile />} path="/userprofile" />
            <Route element={<EditProfile />} path="/editprofile" />
            <Route
              element={<InfoRutas />}
              path="/infoRuta/:nombre"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
