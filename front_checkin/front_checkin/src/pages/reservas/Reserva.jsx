import React, { useEffect, useState } from "react";
import CardEspacio from "../../components/CardEspacio";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";

import { getEspaciosEmpresaDeportes } from "../../services/espacios/espacio";

const Reserva = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [espacios, setEspacios] = useState([]);
  const [dataEspacio, setDataEspacio] = useState("");
  const showData = async () => {
    const data = { id_empresa: id };
    const dataEspacios = await getEspaciosEmpresaDeportes(data);
    setEspacios(dataEspacios.data);
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
        <h1>Reservas</h1>
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
          <Modal onClose={closeModal} datosReserva={dataEspacio}></Modal>
        )}
      </div>
    </>
  );
};
export default Reserva;
