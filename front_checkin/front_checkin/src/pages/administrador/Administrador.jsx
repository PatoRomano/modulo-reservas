import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp";
import Tabla from "../administrador/components/Tabla";
import ButtonBook from "../../components/ButtonBook";
import { Link } from "react-router-dom";
import { getEspaciosEmpresas } from "../../services/espacios/espacio";
import {getReservas} from "../../services/reservas/reservas"
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//  <Card key={deporte.id} title={deporte.nombre_publico}
//  imageSrc={deporte.nombre === "futbol" ? ImageSoccer : deporte.nombre === "paddle" ? ImagePaddle : ImageHandball} />
const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: #ffffff;
  margin :15px;
  cursor: pointer;

  &:hover {
    background-color: #0d8bf2;
  }
`;


const Administrador = () => {
  const [espacios, setEspacios] = useState([]);
  const [reservas, setReservas] = useState([]);

  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const { empresa } = isAuthenticated || {};

  //---------obtengo los tipo deporte--------
  const showData = async () => {
    const data = { id_empresa: empresa };
    const dataEspacios = await getEspaciosEmpresas(data);
    const dataReservas = await getReservas(data);
    setEspacios(dataEspacios.data);
    setReservas(dataReservas.data)
  };
  
  useEffect(() => {
    showData();
  }, []);
  return (
    <>
      <Header title="Administra tus espacios y reservas" backgroundImage={Fondo}></Header>
      <div className="container">
        <Link to="/espacios">
          <Button>Tus Espacio</Button>
        </Link>
        <Link to="/crearReserva">
          <Button>Crear Reserva</Button>
        </Link>
        <Tabla reservas = {reservas} actualizarReservas={setReservas}></Tabla>
        

      </div>
    </>
  );
};
export default Administrador;
