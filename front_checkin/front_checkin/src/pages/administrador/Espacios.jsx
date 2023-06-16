import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp";
import CardEspacio from "../../components/CardEspacio";
import { Link } from "react-router-dom";
import { getEspaciosEmpresas } from "../../services/espacios/espacio";
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
  margin: 15px;
  cursor: pointer;

  &:hover {
    background-color: #0d8bf2;
  }
`;
const ContainerEspacios = styled.div`
  gap :20px;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  align-items: flex-start; 
  justify-content: center;
`;
const CardContainer = styled.div`
  width: 100%; 
`;

const Espacios = () => {
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
      <Link to="/crearespacio">
        <Button>Crear espacio</Button>
      </Link>
      <div className="container">
        <h1>Espacios</h1>
        </div>
        <ContainerEspacios>
          {espacios.map((elemento) => (
            <>
              <CardContainer>
                <CardEspacio imageSrc="vasxmas.jpg" title={elemento.nombre} accion = {1} />
              </CardContainer>
            </>
          ))}
        </ContainerEspacios>
   
    </>
  );
};

export default Espacios;
