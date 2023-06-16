import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp";
import {Tabla} from "../administrador/components/Tabla"
import { Link } from "react-router-dom";
import { getEspaciosEmpresas } from "../../services/espacios/espacio";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
//  <Card key={deporte.id} title={deporte.nombre_publico}
//  imageSrc={deporte.nombre === "futbol" ? ImageSoccer : deporte.nombre === "paddle" ? ImagePaddle : ImageHandball} />

const Administrador = () => {
  const [espacios, setEspacios] = useState([]);
  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const { empresa } = isAuthenticated || {};

  //---------obtengo los tipo deporte--------
  const showData = async () => {
    const data = { id_empresa: empresa };
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
        <Link to="/crearespacio">
          <button>Crear Espacio</button>
        </Link>
        <Tabla espacios = {espacios}></Tabla>
        

      </div>
    </>
  );
};
export default Administrador;
