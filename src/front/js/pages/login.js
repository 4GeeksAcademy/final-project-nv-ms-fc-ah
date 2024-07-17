import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    const { actions } = useContext(Context);

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await actions.userLogin(email, password);
            if (response && response.token){
                window.location.href = "/home";
            }
        }
        catch(error){
            setError("Error al iniciar sesión, correo o contraseña equivocados");
        }
    }

    return (
        <div className="container-fluid py-5">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="staticEmail" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Contraseña</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                {error && <div className="alert alert.danger" role="alert">{error}</div>}
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Login</button>
            </div>
            </form>
            <Link to="/">Volver al inicio.</Link>
        </div>
    );
};