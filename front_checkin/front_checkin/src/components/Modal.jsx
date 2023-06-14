import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ButtonBook from "./ButtonBook";
import { getReservasDeportes } from "../services/reservas/reservas";
import Calendar from "react-calendar";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas de igual tamaño */
  gap: 20px; /* Espacio entre las columnas */
  background-color: #fff;
  padding: 20px;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
const CalendarContainer = styled.div`
  .disponible {
    background-color: green;
  }

  .no-disponible {
    background-color: red;
  }
`;
const Modal = ({ onClose, children, datosReserva }) => {
  const { register, handleSubmit } = useForm();
  const [reservas, setReservas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);

  const countReservasPorDia = (fecha) => {
    const reservasDia = reservas.filter((reserva) => {
      const fechaReserva = new Date(reserva.fecha_inicio);
      return (
        fechaReserva.getFullYear() === fecha.getFullYear() &&
        fechaReserva.getMonth() === fecha.getMonth() &&
        fechaReserva.getDate() === fecha.getDate()
      );
    });

    return reservasDia.length;
  };

  const showData = async () => {
    const data = { id_empresa: datosReserva };
    const dataReservas = await getReservasDeportes(data);
    setReservas(dataReservas.data);

    const fechasDisponibles = [];
    const fechasNoDisponibles = [];

    const fechaActual = new Date();
    const fechaMaxima = new Date();
    fechaMaxima.setDate(fechaMaxima.getDate() + 7);

    const fechaRecorrido = new Date(fechaActual);

    while (fechaRecorrido <= fechaMaxima) {
      const reservasDia = countReservasPorDia(fechaRecorrido);

      if (reservasDia < 8) {
        fechasDisponibles.push(fechaRecorrido);
      } else {
        fechasNoDisponibles.push(fechaRecorrido);
      }

      fechaRecorrido.setDate(fechaRecorrido.getDate() + 1);
    }

    setFechasDisponibles(fechasDisponibles);
    setFechasNoDisponibles(fechasNoDisponibles);
  };

  useEffect(() => {
    showData();
  }, []);

  const onSubmit = (data) => {
    console.log(reservas);
  };
  
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>
        <div>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="">Fecha</Label>
            <Input type="date" {...register("fecha")} />

            <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>
              Guardar
            </ButtonBook>
          </form>
        </div>
        {children}
        <CalendarContainer>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileDisabled={({ date }) =>
              !fechasDisponibles.some((fecha) =>
                isSame(new Date(fecha), date)
              )
            }
            tileClassName={({ date }) =>
              fechasNoDisponibles.some((fecha) =>
                isSame(new Date(fecha), date)
              )
                ? "no-disponible"
                : "disponible"
            }
          />
        </CalendarContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
