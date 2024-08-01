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
				try {
					// fetching data from the backend
					//const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
					// Hacer la petición al backend
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
					// Guardar el token en sessionStorage
					sessionStorage.setItem("accessToken", data.token);
					// Guardar el user_id en localStorage
					localStorage.setItem("userId", data.user_id);
					// Guardar el user_id en el store
					setStore({
						user: {
							id: data.user_id
						}
					});
					// Retornar la data como resolución de la promesa
					return data;
				} catch (error) {
					console.log("Error al iniciar sesión.", error);
					throw error;
				}
			},

			userRegister: async (email, password, username) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({ email, password, username })
					});

					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al registrarse.");
					}

					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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

			userHome: async () => {
				try {
					const token = sessionStorage.getItem("accessToken")
					if (!token) {
						throw new Error("Falta el token de acceso.");
					}
					const resp = await fetch(process.env.BACKEND_URL + "/api/home", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`
						}
					});

					const data = await resp.json();

					console.log("user data", data);

					if (!resp.ok) {
						throw new Error(data.msg || "Error al obtener datos protegidos.");
					}

					const { user } = getStore();

					if (JSON.stringify(user) !== JSON.stringify(data)) {
						setStore({ user: data });
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
				// Obtener el ID del usuario del store o del localStorage
				const userId = user?.id || localStorage.getItem('userId');
				if (!userId) {
					throw new Error('El ID del usuario no está disponible.');
				}
				const url = `${process.env.BACKEND_URL}/api/user/${userId}`;
				try {
					const resp = await fetch(url, {
						headers: { "Content-type": "application/json" },
					});
					if (!resp.ok) {
						const errorDetails = await resp.json();
						throw new Error(`Error ${resp.status}: ${errorDetails.message || resp.statusText}`);
					}
					const data = await resp.json();
					// Actualizar el estado con los datos del usuario
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

			leaveGroup: async (group_id) => {
				try {
					// Assuming you store the token in the localStorage or in your app's state
					const token = sessionStorage.getItem("accessToken");

					if (!token) {
						throw new Error("No token available.");
					}

					const url = `${process.env.BACKEND_URL}/api/groups/${group_id}/leave`;
					const resp = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`, // Include the token in the Authorization header
						},
					});

					if (!resp.ok) {
						const errorData = await resp.json();
						throw new Error(errorData.msg || "Error al abandonar el grupo.");
					}

					console.log("Has abandonado el grupo.");
				} catch (error) {
					console.error("Error al abandonar el grupo:", error);
					throw error;
				}
			},

			deleteAllGroupMembers: async (groupId) => {
				try {
					const deleteMembersUrl = `${process.env.BACKEND_URL}/api/delete-group-members/${groupId}`;
					const deleteMembersResp = await fetch(deleteMembersUrl, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
						},
					});

					if (!deleteMembersResp.ok) {
						throw new Error('Error deleting group members');
					}

					console.log('All group members deleted successfully');
				} catch (error) {
					console.error('Error deleting group members:', error.message);
					throw error; // Rethrow to allow handling in the calling code
				}
			},

			deleteGroup: async (groupId) => {
				try {
					const deleteGroupUrl = `${process.env.BACKEND_URL}/api/groups/${groupId}`;
					const deleteGroupResp = await fetch(deleteGroupUrl, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
						},
					});

					if (!deleteGroupResp.ok) {
						throw new Error('Error deleting the group');
					}

					console.log('Group deleted successfully');
				} catch (error) {
					console.error('Error deleting the group:', error.message);
					throw error; // Rethrow to allow handling in the calling code
				}
			},

			addGroupMember: async (groupId, userId, role) => {
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

					const response = await fetch(`${process.env.BACKEND_URL}/api/add_group_members`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify({ group_id: groupId, user_id: userId, role }),
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error(data.error || "Failed to add group member");
					}

					// Dispatch action to update the store if needed
					return data;
				} catch (error) {
					console.error("Error adding group member:", error);
					throw error;
				}
			},

			deleteGroupMember: async (groupId, userId) => {
				try {
					// Make the DELETE request to the endpoint
					const response = await fetch(`${process.env.BACKEND_URL}/api/groups/${groupId}/members/${userId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						}
					});

					// Log the response status and text for debugging
					console.log(`Response status: ${response.status}`);
					const data = await response.json();

					if (!response.ok) {
						console.error('Error details:', data);
						throw new Error(data.message || 'Failed to delete group member');
					}

					console.log('Group member deleted successfully');
					// Optionally, dispatch an action to update the store if needed
					return data;
				} catch (error) {
					console.error('Error deleting group member:', error.message);
					throw error;
				}
			},




			getAllUsers: async () => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
					},
				});
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}
				return response.json();
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
			updateProfile: async (updatedProfile) => {
				const userId = localStorage.getItem('userId');
				if (!userId) {
					throw new Error("El ID del usuario no está disponible.");
				}
				const url = `${process.env.BACKEND_URL}/api/update_profile`;
				// Asegúrate de que el campo `img` esté incluido si lo estás actualizando
				const profileWithId = {
					user_id: parseInt(userId, 10),
					...updatedProfile
				};
				console.log('Perfil a actualizar:', profileWithId);
				try {
					const resp = await fetch(url, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(profileWithId),
					});
					if (!resp.ok) {
						const errorDetails = await resp.json();
						throw new Error(`Error ${resp.status}: ${errorDetails.message || resp.statusText}`);
					}
					// Obtener los datos actualizados
					const updatedUser = await resp.json();
					// Actualizar el store con los datos actualizados
					const actions = getActions();
					await actions.userData(); // Llama a userData a través de getActions()
					setStore({
						user: {
							...getStore().user,
							...updatedUser,
						},
					});
					return updatedUser;
				} catch (error) {
					console.error("Error al actualizar el perfil del usuario.", error);
					throw error;
				}
			},
			//accion para subir imagenes
			uploadImage: async (file) => {
				try {
					const token = sessionStorage.getItem("accessToken");
					if (!token) {
						throw new Error("Falta el token de acceso.");
					}
					const formData = new FormData();
					formData.append('file', file);
					//llamada a la api
					const resp = await fetch(process.env.BACKEND_URL + "/api/upload_image", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${token}`
						},
						body: formData
					});
					const data = await resp.json();
					if (!resp.ok) {
						throw new Error(data.msg || "Error al subir la imagen.");
					}
					// console.log en caso de exito
					console.log("Imagen subida con éxito", data);
					return data;
				} catch (error) {
					//console.log en caso de error
					console.error("Error al subir la imagen:", error);
					throw error;
				}
			}
		}
	};
};
export default getState;