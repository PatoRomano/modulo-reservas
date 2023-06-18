import React, { useEffect, useState } from "react";
import CardEspacio from "../../components/CardEspacio";
import ModalSalon from "../../components/ModalSalon";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {getEspaciosEmpresaSalones } from "../../services/espacios/espacio";



const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;



const ReservaSalon = () => {
  const { id, tipo} = useParams();
  const [showModal, setShowModal] = useState(false);
  const [espacios, setEspacios] = useState([]);
  const [dataEspacio, setDataEspacio] = useState("");

  
  const showData = async () => {
    const data = { id_empresa: id };
      console.log("entre");
      const dataEspacios = await getEspaciosEmpresaSalones(data);
      setEspacios(dataEspacios.data);
      console.log(dataEspacios)
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

  const handleModal = (id, hora_inicio, hora_fin) =>{
    const data = {"id" : id, "hora_inicio":hora_inicio,"hora_fin":hora_fin};
    setDataEspacio(data);
    openModal();
  }

  return (
    <>
      <div className="container">
        <h1>Salones</h1>
        {espacios.map((elemento) => (
          <>
            <div className="">
              <h1>{elemento.nombreespacio}</h1>
            </div>
            <div className="">
              <h3>{elemento.precio_hora }</h3>
            </div>
            <div>
            <button onClick={() => handleModal(elemento.id, elemento.hora_inicio, elemento.hora_fin)}>Reservar</button>
            </div>
          </>
        ))}

        {showModal && (
          <ModalSalon onClose={closeModal} datosReserva={dataEspacio}></ModalSalon>
        )}
      </div>
    </>
  );
};
export default ReservaSalon;
