import React, {useContext, useEffect, useState} from "react";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
	const [userData, setUserData] = useState()

	const navigate = useNavigate()

	const{actions, store} = useContext(Context)
	const {user} = store;

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
 
	useEffect(() => {
		if(user){
			const getUserData = async() => {
				const url = process.env.BACKEND_URL + `/api/user/${user.id}`
				try {
					const resp = await fetch(url, {
						headers: {'Content-type':'application/json'}
					})
	
					if(!resp.ok){
						throw new Error(resp.message || `${resp.statusText}, ${resp.status}`)
					}
	
					const data = await resp.json()
					 
					return setUserData(data) 
	
				} catch (error) {
					console.log(`message_error: ${error.message}`)
				}
			}
			getUserData()
		}

	}, [user]) 


	return (
		<>
		<Navbar />
		<div className="container-fluid text-center mt-5">
            <h1>
				{userData && (
					<p>Bienvenido, {userData.username.toUpperCase()} gracias por iniciar sesión!</p>
				)}
			</h1>
		</div>
		</>
	);
};