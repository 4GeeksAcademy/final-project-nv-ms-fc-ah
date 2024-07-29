import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardUnGrupo } from "../component/Card/cardUnGrupo";

export const VerMisGrupos = () => {
  const { actions, store } = useContext(Context);
  const [error, setError] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [groupAdmins, setGroupAdmins] = useState({});
  const [adminInfo, setAdminInfo] = useState([]);
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
    Promise.all([actions.getGroups(), actions.getGroupMembers()])
      .then(async ([groups, members]) => {
        setGrupos(groups);
        setMiembros(members);
        console.log(JSON.stringify(members))
        

        // Collect admin information
        const admins = members.filter(member => member.role === "admin");
        console.log("members:" + members)
        const adminPromises = admins.map(async admin => {
          const userInfo = await actions.userInfo(admin.user_id);
          return { ...admin, userInfo };
        });
        const adminInfos = await Promise.all(adminPromises);
        console.log("adminInfos:" + adminInfos)

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
      });
  }, [actions]);

  return (
    <>
      <Navbar />

      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          grupos.length > 0 ? (
            grupos.map(grupo => (
              <CardUnGrupo
              group_name={grupo.name}
              admin={groupAdmins[grupo.id] || 'No admins'}
              link_id={grupo.id}
              />
            ))
          ) : (
            <p>Cargando grupos...</p>
          )
        )}
      </div>
      <Footer />
    </>
  );
};
