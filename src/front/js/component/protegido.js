import { Outlet, Navigate } from "react-router-dom";
import React ,{ useEffect } from "react";


export const Protegido = ({children}) => {



        const isLoggedIn = sessionStorage.getItem("accessToken");
    
        if (!isLoggedIn) {
          return <Navigate to={"/"}/>;
        } else {
            return <Outlet/>
        }


}