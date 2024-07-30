import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardUnGrupo } from "../component/Card/cardUnGrupo";
import "../../styles/verMisGrupos.css";

export const VerMisGrupos = () => {
  const { actions, store } = useContext(Context);
  const [error, setError] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [groupAdmins, setGroupAdmins] = useState({});
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  const { user } = store;

  useEffect(() => {
    if (!user) {
      actions.userHome()
        .then(data => {
          console.log("User data fetched and set, from user home:", data);
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error.message);
          setError('No se pudo obtener la información del usuario.');
        });
    }
  }, [navigate, actions, user]);

  useEffect(() => {
    if (user) {
      Promise.all([actions.getGroups(), actions.getGroupMembers()])
        .then(async ([groups, members]) => {
          // Filter groups based on user membership
          const userGroups = groups.filter(group =>
            members.some(member => member.group_id === group.id && member.user_id === user.id)
          );
          setGrupos(userGroups);

          console.log("Filtered Groups:", userGroups);

          // Collect admin information
          const admins = members.filter(member => member.role === "admin" && userGroups.some(group => group.id === member.group_id));
          console.log("Admins:", admins);
          const adminPromises = admins.map(async admin => {
            const userInfo = await actions.userInfo(admin.user_id);
            return { ...admin, userInfo };
          });
          const adminInfos = await Promise.all(adminPromises);
          console.log("Admin Infos:", adminInfos);

          // Create a mapping from group ID to admins
          const adminsByGroup = {};
          adminInfos.forEach(({ group_id, userInfo }) => {
            if (!adminsByGroup[group_id]) {
              adminsByGroup[group_id] = [];
            }
            adminsByGroup[group_id].push(userInfo.username);
          });

          setGroupAdmins(adminsByGroup);
        })
        .catch(error => {
          console.error('Error al obtener la información:', error.message);
          setError('No se pudo obtener la información.');
        })
        .finally(() => {
          setLoading(false); // Set loading to false when data fetching is complete
        });
    }
  }, [actions, user]);

  return (
    <>
      <Navbar />
      <div className="group-container">
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Cargando grupos...</p>
        ) : grupos.length > 0 ? (
          grupos.map(grupo => (
            <CardUnGrupo
              key={grupo.id}
              group_name={grupo.name}
              admin={groupAdmins[grupo.id] || 'No admins'}
              link_id={grupo.id}
            />
          ))
        ) : (
          <p>No eres miembro de ningún grupo.</p>
        )}
      </div>
    </>
  );
};
