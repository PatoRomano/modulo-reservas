import React, { useEffect, useState } from "react";
import CardEspacio from "../../components/CardEspacio";
import Modal from "../../components/Modal";
const Reserva = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        <h1>Reservas</h1>
        <CardEspacio imageSrc="vasxmas.jpg" title="Cancha de 7" />
        <CardEspacio imageSrc="vasxmas.jpg" title="Cancha de 5" />
        <button onClick={openModal}>Abrir Modal</button>

        {showModal && (
          <Modal onClose={closeModal}>{/* Contenido del modal */}</Modal>
        )}
      </div>
    </>
  );
};
export default Reserva;
