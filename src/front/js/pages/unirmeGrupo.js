import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardUnGrupo } from "../component/Card/cardUnGrupo";
import "../../styles/verMisGrupos.css"; // Import the CSS file

export const UnirmeAGrupo = () => {
  const { actions, store } = useContext(Context);
  const [error, setError] = useState(null);
  const [nonMemberGroups, setNonMemberGroups] = useState([]);
  const [groupAdmins, setGroupAdmins] = useState({});
  const [loading, setLoading] = useState(true);
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
          // Filter groups where the user is not a member
          const userGroups = groups.filter(group =>
            !members.some(member => member.group_id === group.id && member.user_id === user.id)
          );
          setNonMemberGroups(userGroups);

          console.log("Filtered Non-Member Groups:", userGroups);

          // Collect admin information
          const adminPromises = userGroups.map(async group => {
            const adminMember = members.find(member => member.group_id === group.id && member.role === "admin");
            if (adminMember) {
              const userInfo = await actions.userInfo(adminMember.user_id);
              return { group_id: group.id, username: userInfo.username };
            }
            return null; // No admin found for this group (shouldn't happen)
          });

          const adminInfos = await Promise.all(adminPromises);
          console.log("Admin Infos:", adminInfos);

          // Create a mapping from group ID to admins
          const adminsByGroup = {};
          adminInfos.forEach(admin => {
            if (admin) {
              adminsByGroup[admin.group_id] = admin.username;
            }
          });

          setGroupAdmins(adminsByGroup);
        })
        .catch(error => {
          console.error('Error al obtener la información:', error.message);
          setError('No se pudo obtener la información.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [actions, user]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Cargando grupos...</p>
        ) : nonMemberGroups.length > 0 ? (
          <div className="row justify-content-center">
            {nonMemberGroups.map(grupo => (
              <div key={grupo.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
                <CardUnGrupo
                  group_name={grupo.name}
                  admin={groupAdmins[grupo.id] || 'No admins'}
                  link_id={grupo.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No hay grupos disponibles para unirse.</p>
        )}
      </div>
    </>
  );
};
