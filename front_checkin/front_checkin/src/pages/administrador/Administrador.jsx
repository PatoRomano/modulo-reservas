import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp";
import CardEspacio from "../../components/CardEspacio";
import { Link } from 'react-router-dom';
import { getEspaciosEmpresas } from "../../services/espacios/espacio";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from 'react-router-dom';
//  <Card key={deporte.id} title={deporte.nombre_publico} 
//  imageSrc={deporte.nombre === "futbol" ? ImageSoccer : deporte.nombre === "paddle" ? ImagePaddle : ImageHandball} />

const Administrador = () => {
    const [espacios, setEspacios] = useState([]);
    const authUser = useAuthUser();
    const isAuthenticated = authUser();
    const { empresa } = isAuthenticated || {};

  //---------obtengo los tipo deporte--------
  const showData = async () => {
    const data = {"id_empresa" : empresa}
    const dataEspacios = await getEspaciosEmpresas(data);
    setEspacios(dataEspacios.data);
    console.log(espacios);
  };
  useEffect(() => {
    showData();
  }, []);
    return (
        <>
        <Header title="Administra tus espacios" backgroundImage={Fondo}></Header>
        <div className="container">
        <h1>Espacios</h1>
        {espacios.map((elemento) => (
          <CardEspacio imageSrc="vasxmas.jpg" title={elemento.nombre} />
        ))}
      </div>
        </>
    )
}
export default Administrador;