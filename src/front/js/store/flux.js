const getState = ({ getStore, getActions, setStore }) => {
	return {
		 store: {
			user: null,
			/* message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			] */
		}, 
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					//const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend andres", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			userLogin: async(email, password) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method:"POST",
						headers: {
							"Content-type" : "application/json"

						},
						body: JSON.stringify({ email, password })
					});
				
					const data = await resp.json();
					
					if (!resp.ok) {
						throw new Error(data.msg || "Error al iniciar sesión.");
					}
					
					
					sessionStorage.setItem("accessToken", data.token);
					// Asume que el backend solo devuelve el user_id
					setStore({
						user: {
							id: data.user_id // Ajusta para la estructura actual del backend
						}
					});
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error al iniciar sesión.", error)
					throw error;
				}

			},


			userRegister: async(email, password, username) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/register",{
						method:"POST",
						headers: {
							"Content-type" : "application/json"

						},
						body: JSON.stringify({ email, password, username })
					});
					
					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al registrarse.");
					}
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error al registrarse", error)
					throw error;
				}
			},

			userLogout: () => {
				try {
					sessionStorage.removeItem("accessToken");
					setStore({ user: null });
				} catch (error) {
					console.error("Error al cerrar sesión.", error);
					throw error;
				}
			},

			userHome: async () =>{
				try {
					const token = sessionStorage.getItem("accessToken")
					if (!token) {
						throw new Error ("Falta el token de acceso.");
					}
					const resp = await fetch(process.env.BACKEND_URL + "/api/home", {
						method : "GET",
						headers: {
							Authorization: `Bearer ${token}`
						}
					});

					const data = await resp.json();

					console.log(data);

					if(!resp.ok){
						throw new Error(data.msg || "Error al obtener datos protegidos.");
					}

					const {user} = getStore();
				

					if(JSON.stringify(user) !== JSON.stringify(data)){
						setStore({user: data});
						console.log("Datos de usuario actualizados en el store.", data)
					}
				} catch (error) {
					console.error("Error al obtener datos protegidos.", error);
					throw error;
				}
			},

			userCreateGroup: async (group_name, path_id) => {
				try{
					const token = sessionStorage.getItem("accessToken")
					if (!token) {
						throw new Error ("Falta el token de acceso.");
					}
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/groups",{
						method:"POST",
						headers: {
							"Content-type" : "application/json",
							Authorization: `Bearer ${token}`

						},
						body: JSON.stringify({ group_name, path_Id })
					});
					
					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al crear grupo.");
					}
					
					return data;
				}catch(error){
					console.log("Error al crear grupo", error)
					throw error;
				}
			},
			userData: async () => {
				const { user } = getStore();
				if (!user || !user.id) {
					throw new Error('El ID del usuario no está disponible.');
				}
				const url = `${process.env.BACKEND_URL}/api/user/${user.id}`;
				try {
					const resp = await fetch(url, {
						headers: { "Content-type": "application/json" },
					});
					if (!resp.ok) {
						const errorDetails = await resp.json();
						throw new Error(`Error ${resp.status}: ${errorDetails.message || resp.statusText}`);
					}
					const data = await resp.json();
					// Actualiza el estado con los datos del usuario
					setStore({
						user: {
							...user, // Mantén la información del usuario existente
							...data // Actualiza con la nueva información
						}
					});
					return data;
				} catch (error) {
					console.error("Error al obtener datos del usuario.", error);
					throw error;
				}
			},
		}
	};
};

export default getState;