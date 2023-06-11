import React, {  useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {login} from '../services/auth/auth'
import LoginAuth from './LoginAuth';
import { AuthContext } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff; /* Color azul pastel */
`;

const LoginFormContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #c2d9e2; /* Color azul pastel más oscuro */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* Alineación vertical de los campos */
`;

const Label = styled.label`
  font-weight: bold;
  text-align: center; /* Alineación horizontal del texto */
`;

const Input = styled.input`
  padding: 5px;
  width: 100%; /* Ancho completo del input */
`;

const Button = styled.button`
  padding: 10px;
  background-color: #408ab4; /* Color azul */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Ancho completo del botón */
`;

const LoginForm = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const { auth, handleAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    // Realiza la lógica de autenticación aquí
    const data = {"correo":correo,"contraseña":contraseña};
    try{
      const response = await login(data);
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin();
    } catch (error) {
      console.log('Error:', error.response.data); // Maneja el error como desees
    }
  };

  return (
    <div>
    {auth ? (
      <button onClick={handleLogout}>Cerrar sesión</button>
    ) : (
    <LoginContainer>
      <LoginFormContainer>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="correo">Correo:</Label>
            <Input
              type="text"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contraseña">Contraseña:</Label>
            <Input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
          <Button type="submit">Login</Button>
        </Form>
      </LoginFormContainer>
    </LoginContainer>
    )};
    </div>
  );
  
};

export default LoginForm;