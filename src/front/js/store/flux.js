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

			userLogin: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});
			
					const data = await resp.json();
			
					if (!resp.ok) {
						throw new Error(data.msg || "Error al iniciar sesión.");
					}
			
					sessionStorage.setItem("accessToken", data.token);
					
					// Debugging
					console.log("Login response data:", data);
					
					setStore({
						user: {
							id: data.user_id // Adjust to match your backend response
						}
					});
			
					// Debugging
					console.log("User data set in store:", getStore().user);
			
					return data;
				} catch (error) {
					console.log("Error al iniciar sesión.", error);
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

					console.log("user data", data);

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

			userCreateGroup: async (group_name) => {	
				try {
					const store = getStore();
					console.log("Current store state:", store); // Debugging line
					const { user } = store;
			
					if (!user || !user.id) {
						throw new Error('El ID del usuario no está disponible.');
					}
			
					const token = sessionStorage.getItem("accessToken");
					if (!token) {
						throw new Error("Falta el token de acceso.");
					}
			
					const resp = await fetch(`${process.env.BACKEND_URL}/api/create_group`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify({ user_id: user.id, group_name })
					});
			
					const data = await resp.json();
			
					if (!resp.ok) {
						throw new Error(data.msg || "Error al crear grupo.");
					}
			
					return data;
				} catch (error) {
					console.log("Error al crear grupo", error);
					throw error;
				}
			},
			
			userData: async () => {
				const { user } = getStore();
				console.log("get store from userData",user)
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
			
					// Debugging
					console.log("Fetched user data:", data);
			
					setStore({
						user: {
							...user, // Maintain existing user info
							...data // Update with new info
						}
					});
			
					// Debugging
					console.log("Updated user in store:", getStore().user);
			
					return data;
				} catch (error) {
					console.error("Error al obtener datos del usuario.", error);
					throw error;
				}
			},
			
			changePassword: async (email, newPassword) => {
				try {
					// Llamada a la API para cambiar la contraseña
					const resp = await fetch(process.env.BACKEND_URL + "/api/change_password", {
						method: "PUT",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({ email, password: newPassword }),
					});

					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al cambiar la contraseña.");
					}

					// Opcional: Maneja la respuesta del backend si es necesario
					console.log('Contraseña cambiada exitosamente', data);

					// Retorna los datos (opcional)
					return data;
				} catch (error) {
					console.error("Error al cambiar la contraseña:", error);
					throw error;
				}
			},

			getGroups: async () => {
				try {
					// Llamada a la API para cambiar la contraseña
					const url = `${process.env.BACKEND_URL}/api/groups`;
					const resp = await fetch(url, {
						method: "GET",
						headers: {
							"Content-type": "application/json",
						},
					});

					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al ver los grupos.");
					}

					// Opcional: Maneja la respuesta del backend si es necesario
					console.log('Grupos presentados de manera exitosa', data);

					// Retorna los datos (opcional)
					return data;
				} catch (error) {
					console.error("Error al mostrar los grupos.", error);
					throw error;
				}
			},

			getGroupMembers: async () => {
				try {
					// Llamada a la API para cambiar la contraseña
					const url = `${process.env.BACKEND_URL}/api/all-group-members`;
					const resp = await fetch(url, {
						method: "GET",
						headers: {
							"Content-type": "application/json",
						},
					});

					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al ver los miembros de grupo.");
					}

					// Opcional: Maneja la respuesta del backend si es necesario
					console.log('Miembros de grupo presentados de manera exitosa', data);

					// Retorna los datos (opcional)
					return data;
				} catch (error) {
					console.error("Error al mostrar los miembros de grupo.", error);
					throw error;
				}
			},

			getSingleGroup: async (group_id) => {
				try {
					const url = `${process.env.BACKEND_URL}/api/groups/${group_id}`;
					const resp = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});
			
					// Check if the response is OK
					if (!resp.ok) {
						const errorData = await resp.json();
						throw new Error(errorData.msg || "Error al ver el grupo.");
					}
			
					// Parse the JSON response
					const [data] = await resp.json(); // Extract the first item from the list
			
					// Optional: Handle the response if necessary
					console.log('Grupo presentado de manera exitosa', data);
			
					// Return the group data
					return data;
				} catch (error) {
					console.error("Error al mostrar el grupo.", error);
					throw error;
				}
			},
			

			userInfo: async (user_id) => {
				try {
				  const url = `${process.env.BACKEND_URL}/api/user/${user_id}`;
				  const resp = await fetch(url, {
					method: "GET",
					headers: {
					  "Content-type": "application/json",
					}
				  });
			  
				  const data = await resp.json();
			  
				  if (!resp.ok) {
					throw new Error(data.msg || "Error al obtener datos del usuario.");
				  }
			  
				  return data; // Ensure you return the fetched data
			  
				} catch (error) {
				  console.error("Error al obtener datos del usuario.", error);
				  throw error; // Rethrow to allow handling in calling code
				}
			  },
		}
	};
};

export default getState;