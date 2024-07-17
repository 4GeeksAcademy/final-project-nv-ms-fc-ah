import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { actions } = useContext(Context);

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            const response = await actions.userRegister(email, password, username);
            if (response.email){        
                console.log("Usuario registrado correctamente")        
                alert ("Mensaje: Usuario registrado correctamente.")
                navigate("/")
            }
        }
        catch(error){
            setError("Error al registrarse.");
        }
    }

    return (
        <div className="container-fluid py-5">
            <h1>Regístrate</h1>
            <form onSubmit={handleRegister}>
            <div className="mb-3 row">
                <label htmlFor="staticusername" className="col-sm-2 col-form-label">Nombre de usuario</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="staticusername"  onChange={(e) => setUserName(e.target.value)}></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="staticEmail"  onChange={(e) => setEmail(e.target.value)}></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Contraseña</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
            </div>
            {error && <div className="alert alert.danger" role="alert">{error}</div>}
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Registrarse</button>
            </div>
            </form>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
};