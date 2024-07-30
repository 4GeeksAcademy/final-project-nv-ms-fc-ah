import React, { useState, useEffect, useContext } from "react";
import { CardUserInfo } from "../component/Card/cardUserInfo";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const { actions, store } = useContext(Context);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    const navigate = useNavigate();
    const { user } = store;

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("accessToken");

        if (!isLoggedIn) {
            navigate("/");
        } else {
            actions.userHome()
                .then(() => {
                    console.log("Datos protegidos cargados correctamente.");
                    setUserLoaded(true);
                })
                .catch((error) => {
                    console.error("Error al cargar datos protegidos.", error);
                    setError("No se pudo cargar la información del usuario.");
                    setLoading(false);
                });
        }
    }, [actions, navigate]);

    useEffect(() => {
        if (!userLoaded) return;

        const fetchUsers = async () => {
            if (!user || !user.id) {
                console.log('Current user data:', user);
                setError('User is not logged in or user ID is not available.');
                setLoading(false);
                return;
            }

            try {
                const allUsers = await actions.getAllUsers();
                // Exclude the currently logged-in user
                const filteredUsers = allUsers.filter(u => u.id !== user.id);
                setUsers(filteredUsers);
            } catch (err) {
                setError('No se pudo obtener la lista de usuarios.');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [actions, user, userLoaded]);

    const handleAddUser = async (userId) => {
        try {
            await actions.addUserToGroup(userId); // Add the user to the group
            console.log("Usuario añadido al grupo con éxito.");
            // Optionally refresh the user list or show a success message
        } catch (err) {
            console.error("Error al añadir usuario al grupo:", err);
            // Optionally show an error message
        }
    };

    return (
        <>
            <Navbar />
            <div className="text-center mt-5">
                <h1>Senderistas</h1>
                {loading ? (
                    <p>Cargando senderistas...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : users.length > 0 ? (
                    <div className="d-flex flex-wrap justify-content-center mt-4">
                        {users.map(u => (
                            <CardUserInfo
                                key={u.id}
                                profile_picture={u.img}
                                username={u.username}
                                link_id={u.id}
                                isMember={false} // Update this based on actual membership status
                                onAddUser={handleAddUser}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No hay usuarios disponibles.</p>
                )}
            </div>
        </>
    );
};
