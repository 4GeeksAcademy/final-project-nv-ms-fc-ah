import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { CardUserInfo } from "../component/Card/cardUserInfo";

export const DetalleGrupo = () => {
    const { id } = useParams();
    const { actions } = useContext(Context);

    const [group, setGroup] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch group details
                const groupData = await actions.getSingleGroup(id);
                setGroup(groupData);
                console.log('Group Data:', groupData);

                // Fetch group members
                const membersData = await actions.getGroupMembers();
                console.log('Group Members:', membersData);

                // Collect admin information
                const admins = membersData.filter(member => {
                    return member.group_id === parseInt(id) && member.role === "admin";
                });
                console.log("Filtered Admins:", admins);

                // Fetch admin user info
                const adminPromises = admins.map(async admin => {
                    const userInfo = await actions.userInfo(admin.user_id);
                    return { ...admin, userInfo };
                });
                const adminInfos = await Promise.all(adminPromises);
                console.log("Admin Infos:", adminInfos);

                if (adminInfos.length > 0) {
                    setAdmin(adminInfos[0].userInfo); // Assuming there's only one admin per group
                }

                // Set members information
                const groupMembers = membersData.filter(member => member.group_id === parseInt(id) && member.role === "member");
                const memberPromises = groupMembers.map(async member => {
                    const userInfo = await actions.userInfo(member.user_id);
                    return { ...member, userInfo };
                });
                const memberInfos = await Promise.all(memberPromises);
                console.log("Member Infos:", memberInfos);
                setMembers(memberInfos);

            } catch (err) {
                setError('No se pudo obtener la información del grupo.');
                console.error('Error al obtener la información del grupo:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, actions]);

    return (
        <>
            <Navbar />

            <div className="text-center mt-5">
                <h1>Detalles del Grupo</h1>
                {loading ? (
                    <p>Cargando detalles del grupo...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : group ? (
                    <div>
                        <ul className="list-unstyled d-flex flex-column align-items-center mt-3">
                            <li className="mb-2">ID del grupo: {group.id}</li>
                            <li className="mb-2">Nombre del grupo: {group.name}</li>
                            <li className="mb-2">Administrador: {admin ? admin.username : 'No disponible'}</li>
                        </ul>

                        {/* Display members */}
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
                                members.map(member => (
                                    <CardUserInfo
                                        key={member.user_id}
                                        profile_picture={member.userInfo.img}
                                        username={member.userInfo.username}
                                        role="Miembro"
                                        link_id={member.user_id}
                                    />
                                ))
                            ) : (
                                <p>No hay miembros en este grupo.</p>
                            )}
                        </div>

                        <button type="button" className="btn btn-success m-3">Añadir miembro</button>
                        <button type="button" className="btn btn-warning m-3">Salir del grupo</button>
                        <button type="button" className="btn btn-dark m-3">Eliminar Grupo</button>
                    </div>
                ) : (
                    <p>Grupo no encontrado.</p>
                )}
            </div>
        </>
    );
};
