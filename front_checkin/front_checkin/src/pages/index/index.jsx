import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import Logo from '../../assets/logo.svg';
import {useLocation } from "react-router-dom";
const Index = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get('mensaje');
  
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Ocultar el mensaje después de 5 segundos
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
    <Header title="Reserva al instante, fácil y rápido" logoSrc={Logo}></Header>
    {showMessage && message && <p>{message}</p>}
     <div>
     <h2>Bienvenido</h2>
        <h1></h1>
     </div>
    </>
  );
};
export default Index;
