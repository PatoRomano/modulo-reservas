import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {login} from '../services/auth/auth'

const LoginAuth = () => {
  const { auth, handleAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    // Realiza la lógica de autenticación aquí
    try{
      const response = await login(correo, contraseña);
      console.log(response.data);
      handleAuth(true);
    }catch{

    }
   
    // Si la autenticación es exitosa, llama a handleAuth para establecer el estado de autenticación en true
   
  };

  const handleLogout = () => {
    // Realiza la lógica de cierre de sesión aquí
    // Llama a handleAuth para establecer el estado de autenticación en null o false
    handleAuth(false);
  };

  useEffect(() => {
    if (auth) {
      // Realizar la redirección después de iniciar sesión
      window.location.href = '/';
    }
  }, [auth]);

  return (
    <div>
      {auth ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
    </div>
  );
};

export default LoginAuth;
