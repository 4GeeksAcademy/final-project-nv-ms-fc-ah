import React, {useContext, useEffect} from "react";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {

	const navigate = useNavigate()

	const{actions, store} = useContext(Context)

	useEffect(() => {
		const isLoggedIn = sessionStorage.getItem("accessToken")

		if (!isLoggedIn){
			navigate("/")
		} else {
			actions.userHome()
			.then(() => console.log("Datos protegidos cargados correctamente."))
			.catch(error => console.error("Error al cargar datos protegidos.", error))
		}
	}, [actions, navigate]);

	const {user} = store;

	console.log(store)

	return (
		<>
		<Navbar />
		<div className="container-fluid">
            <h1>
				{user && (
					<p>Bienvenido, {user.id}, gracias por iniciar sesión!</p>
				)}
			</h1>
		</div>
		</>
	);
};