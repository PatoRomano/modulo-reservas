import React, { useEffect, useState } from "react";
import CardEspacio from "../../components/CardEspacio";
import ModalSalon from "../../components/ModalSalon";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEspaciosEmpresaSalones } from "../../services/espacios/espacio";
import ButtonBook from "../../components/ButtonBook";
const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Alinea las cartas hacia la izquierda */
  margin: -8px; /* Ajusta el margen negativo para reducir el espacio entre las cartas */
`;

const Card = styled.div`
  width: 300px;
  background-color: #c0c0ff3c;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 5%;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 40%;
  object-fit: cover;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  &:hover {
    transform: scale(1.10);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Data = styled.div`
  margin-bottom: 16px;
  &:hover {
    transform: scale(1.10);
  }
`;

const Text = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
  
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #0d8bf2;
  }
`;
const DataDescripcion = styled(Data)`
    background-color: #00002d73;
    border-end-end-radius: 5%;
    border-bottom-left-radius:5%;
`;
const ReservaSalon = () => {
  const { id, tipo } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [espacios, setEspacios] = useState([]);
  const [dataEspacio, setDataEspacio] = useState("");

  const showData = async () => {
    const data = { id_empresa: id };
    console.log("entre");
    const dataEspacios = await getEspaciosEmpresaSalones(data);
    setEspacios(dataEspacios.data);
    console.log(dataEspacios);
  };
  useEffect(() => {
    showData();
  }, []);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModal = (id, hora_inicio, hora_fin) => {
    const data = { id: id, hora_inicio: hora_inicio, hora_fin: hora_fin };
    setDataEspacio(data);
    openModal();
  };

  return (
    <>
      <div className="container">
        <h1>Reservas salon</h1>
        <Container>
          {espacios.map((elemento) => (
            <>
              <Card>
                <Image src="/salon.jpeg" alt="" />
                <Content>
                  <DataDescripcion>
                    <Data>
                      <Text>Datos:</Text>
                      <Price>{elemento.nombreespacio}</Price>
                      <Price> ${elemento.precio_hora}/Turno</Price>
                    </Data>
                  </DataDescripcion>
                  <Data>
                    <Text>Descripción:</Text>
                    <Text>{elemento.descripcion}</Text>
                  </Data>
                  <ButtonBook
                    onButtonClick={() =>
                      handleModal(
                        elemento.id,
                        elemento.hora_inicio,
                        elemento.hora_fin
                      )
                    }
                  >
                    Reservar
                  </ButtonBook>
                </Content>
              </Card>
            </>
          ))}
        </Container>
        {showModal && (
          <ModalSalon
            onClose={closeModal}
            datosReserva={dataEspacio}
          ></ModalSalon>
        )}
      </div>
    </>
  );
};
export default ReservaSalon;
