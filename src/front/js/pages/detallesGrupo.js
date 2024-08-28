import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { CardUserInfo } from "../component/Card/cardUserInfo";
import UserModal from "../component/userModal";
import { Button } from 'react-bootstrap';

export const DetalleGrupo = () => {
    const { id } = useParams();
    const { actions, store } = useContext(Context);
    const { user } = store;

    const [group, setGroup] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userFetched, setUserFetched] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [usersToAdd, setUsersToAdd] = useState([]);
    const [posts, setPosts] = useState([]); // State to store posts
    const [title, setTitle] = useState(''); // Title input state
    const [message, setMessage] = useState(''); // Message input state

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            // Fetch group details
            const groupData = await actions.getSingleGroup(id);
            setGroup(groupData);

            // Fetch group members
            const membersData = await actions.getGroupMembers();
            const admins = membersData.filter(member => member.group_id === parseInt(id) && member.role === "admin");

            const adminInfos = await Promise.all(
                admins.map(async admin => {
                    const userInfo = await actions.userInfo(admin.user_id);
                    return { ...admin, userInfo };
                })
            );

            if (adminInfos.length > 0) {
                setAdmin(adminInfos[0].userInfo);
            }

            const groupMembers = membersData.filter(member => member.group_id === parseInt(id));
            const memberInfos = await Promise.all(
                groupMembers.map(async member => {
                    const userInfo = await actions.userInfo(member.user_id);
                    return { ...member, userInfo };
                })
            );

            setMembers(memberInfos);

        } catch (err) {
            setError('No se pudo obtener la información del grupo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await actions.userHome(); // Fetch user data
                setUserFetched(true);
            } catch (err) {
                setError('Error al obtener datos del usuario.');
            }
        };

        fetchUserData();
    }, [actions]);

    useEffect(() => {
        if (userFetched) {
            fetchData();
        }
    }, [id, actions, userFetched]);

    const fetchUsersToAdd = async () => {
        try {
            const allUsers = await actions.getAllUsers();
            const nonMembers = allUsers.filter(user => !members.some(member => member.userInfo.id === user.id));
            setUsersToAdd(nonMembers);
        } catch (error) {
            console.error("Error fetching users to add:", error);
        }
    };

    const handleShowModal = async () => {
        await fetchUsersToAdd();
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleAddUser = async (userId) => {
        try {
            await actions.addGroupMember(id, userId, "member");
            console.log(`User ${userId} added successfully.`);
            await fetchData(); // Refresh members after adding
            // Keep the modal open
        } catch (error) {
            console.error("Error adding user to group:", error);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            console.log('Removing user with ID:', userId); // Debugging line
            await actions.deleteGroupMember(id, userId); // Pass groupId as well
            console.log(`User ${userId} removed successfully.`);
            await fetchData(); // Refresh members after removing
        } catch (error) {
            console.error('Error removing user from group:', error);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            await actions.leaveGroup(id);
            navigate("/grupos/mis-grupos");
        } catch (error) {
            console.error("Error al intentar abandonar el grupo:", error);
        }
    };

    const handleDeleteGroup = async () => {
        try {
            await actions.deleteAllGroupMembers(id);
            await actions.deleteGroup(id);
            navigate("/grupos/mis-grupos");
        } catch (error) {
            console.error("Error al eliminar el grupo:", error.message);
        }
    };

    const handleJoinGroup = async () => {
        try {
            await actions.addGroupMember(id, user.id, "member");
            console.log(`User ${user.id} joined the group successfully.`);
            await fetchData(); // Refresh members after joining
        } catch (error) {
            console.error("Error joining the group:", error);
        }
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            message
        };
        setPosts([...posts, newPost]); // Add the new post to the posts state
        setTitle(''); // Clear title input
        setMessage(''); // Clear message input
    };

    const isAdmin = admin && user && admin.id === user.id;
    const isMember = members.some(member => member.userInfo && user && member.userInfo.id === user.id);

    return (
        <>
            <Navbar />
            <div className="text-center mt-5">
                {group ? (
                    <>
                        <h1>{group.name}</h1>
                        {admin && (
                            <p><strong>Administrador:</strong> {admin.username}</p>
                        )}
                    </>
                ) : (
                    <h1>Detalles del Grupo</h1>
                )}

                {loading ? (
                    <p>Cargando detalles del grupo...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : group ? (
                    <div>
                        <ul className="list-unstyled d-flex flex-column align-items-center mt-3">
                            <li className="mb-2">ID del grupo: {group.id}</li>
                        </ul>

                        <div className="member-cards d-flex flex-wrap justify-content-center mt-4">
                            {admin && (
                                <CardUserInfo
                                    key={admin.id}
                                    profile_picture={admin.img}
                                    username={admin.username}
                                    role="Administrador"
                                    link_id={admin.id}
                                />
                            )}
                            {members.length > 0 ? (
                                members.filter(member => member.userInfo.id !== admin.id).map(member => (
                                    <CardUserInfo
                                        key={member.userInfo.id}
                                        profile_picture={member.userInfo.img}
                                        username={member.userInfo.username}
                                        role={member.role}
                                        link_id={member.userInfo.id}
                                        handleAddUser={handleAddUser}
                                        showAddButton={false} // or true if needed
                                        handleRemoveUser={handleRemoveUser}
                                        showRemoveButton={isAdmin} // Only show the button for admin
                                    />
                                ))
                            ) : (
                                <p>No hay miembros en este grupo.</p>
                            )}
                        </div>

                        {isAdmin ? (
                            <>
                                <Button variant="success" className="m-3" onClick={handleShowModal}>
                                    Añadir miembro
                                </Button>
                                <Button variant="dark" className="m-3" onClick={handleDeleteGroup}>
                                    Eliminar Grupo
                                </Button>
                            </>
                        ) : isMember ? (
                            <Button variant="warning" className="m-3" onClick={handleLeaveGroup}>
                                Salir del grupo
                            </Button>
                        ) : (
                            <Button variant="primary" className="m-3" onClick={handleJoinGroup}>
                                Unirme a este grupo
                            </Button>
                        )}

                        <UserModal
                            show={showModal}
                            handleClose={handleCloseModal}
                            users={usersToAdd}
                            handleAddUser={handleAddUser}
                        />

                        {isAdmin && (
                            <div>
                                <div className="dropdown">
                                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                        Publicar Mensaje
                                    </button>
                                    <form className="dropdown-menu p-4" onSubmit={handlePostSubmit}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Título"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Mensaje"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-info">Publicar</button>
                                    </form>
                                </div>

                                <div className="mt-4">
                                    <h3>Mensajes del grupo:</h3>
                                    {posts.length > 0 ? (
                                        posts.map((post, index) => (
                                            <div key={index} className="alert alert-info">
                                                <strong>{post.title}</strong>
                                                <p>{post.message}</p>
                                                
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay mensajes en este grupo.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Grupo no encontrado.</p>
                )}
            </div>
        </>
    );
};