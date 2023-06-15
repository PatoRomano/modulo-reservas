import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ButtonBook from "./ButtonBook";
import { getReservasDeportes } from "../services/reservas/reservas";
import Calendar from "react-calendar";
import { addHours, eachHourOfInterval, format, parseISO } from "date-fns";

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
  grid-template-columns: 2fr 1fr 1fr; /* Dos columnas de igual tamaño */
  gap: 20px; /* Espacio entre las columnas */
  background-color: #fff;
  padding: 20px;
`;

const CardDisponible = styled.button`
  display: flex;
  flex-direction: column;
  background-color: green;
  cursor: pointer;
  margin: 5px;
`;
const CardNoDisponible = styled.button`
  display: flex;
  flex-direction: column;
  background-color: red;
  pointer-events: none;
  margin: 5px;
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
const TileContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const NoDisponibleTile = styled(TileContentContainer)`
  background-color: red;
  color: white;
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
const CalendarContainer = styled.div`
  .react-calendar {
    border: none;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    color: #202124;
  }

  .react-calendar__tile {
    padding: 0;
    margin: 0;
    background-color: #41e175;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d50000;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #8f8f8f;
  }

  .react-calendar__month-view__weekdays__weekday {
    font-weight: bold;
    color: #5f6368;
  }

  .react-calendar__tile--active {
    background-color: #f2f9fd;
    color: #202124;
  }

  .react-calendar__tile--now {
    background-color: #eaf6ff;
    color: #202124;
  }

  .react-calendar__tile--hasActive {
    background-color: #cce1fb;
    color: #202124;
  }

  .react-calendar__tile--hasActive:hover {
    background-color: #cce1fb;
    color: #202124;
  }

  .react-calendar__navigation {
    background-color: #f2f2f2;
    border: none;
  }

  .react-calendar__navigation button {
    font-size: 16px;
    color: #5f6368;
  }

  .react-calendar__tile {
    padding: 0;
    margin: 0;
    width: 10px; /* Ajusta el ancho según tus necesidades */
    height: 40px; /* Ajusta la altura según tus necesidades */
  }
`;
const Modal = ({ onClose, children, datosReserva }) => {
  const { register, handleSubmit } = useForm();
  const [reservas, setReservas] = useState([]);
  const [selectFecha, setSelectFecha] = useState(null);
  const [horario, setHorario] = useState("");

  const cargarHorario = () => {
    const hora_inicio_string = datosReserva.hora_inicio;
    const [horasInicio, minutosInicio, segundosInicio] =
      hora_inicio_string.split(":");
    const fechaInicio = new Date();
    fechaInicio.setHours(horasInicio, minutosInicio, segundosInicio);

    const hora_fin_string = datosReserva.hora_fin;
    const [horasFin, minutosFin, segundosFin] = hora_fin_string.split(":");
    const fechaFin = new Date();
    fechaFin.setHours(horasFin, minutosFin, segundosFin);

    const diferencia = fechaFin.getTime() - fechaInicio.getTime();
    const horarioS = Math.trunc(diferencia / 3600 / 1000);
    setHorario(horarioS);
  };

  const verHorariosDisponibles = () => {
    const reservasHorarios = [];
    reservas.filter((reserva) => {
      const fechaReserva = reserva.fecha_inicio.split("T")[0];
      if (selectFecha == fechaReserva) {
        reservasHorarios.push(reserva.hora_inicio);
      }
    });

    const [horasInicio, minutosInicio, segundosInicio] =
      datosReserva.hora_inicio.split(":");
    const [horasFin, minutosFin, segundosFin] =
      datosReserva.hora_fin.split(":");

    const fechaInicio = addHours(new Date(), horasInicio);
    const fechaFin = addHours(new Date(), horasFin);

    const horas = eachHourOfInterval({
      start: fechaInicio.setHours(fechaInicio.getHours() - 1),
      end: fechaFin.setHours(fechaFin.getHours() - 1),
    });

    const horariosDisponibles = horas.map((hora) => {
      hora.setHours(hora.getHours() - 1);
      const fhora =
        hora.getHours() +
        ":" +
        hora.getMinutes() +
        hora.getMinutes() +
        ":" +
        hora.getSeconds() +
        hora.getSeconds();
      console.log(fhora);
      if (reservasHorarios.includes(fhora)) {
        return (
          <>
            <CardNoDisponible
              type="submit"
              onButtonClick={handleSubmit(onSubmit)}
              key={fhora}
            >
              {fhora}
            </CardNoDisponible>
          </>
        );
      } else {
        return (
          <>
            <CardDisponible
              type="submit"
              onButtonClick={handleSubmit(onSubmit)}
              key={fhora}
            >
              {fhora}
            </CardDisponible>
          </>
        );
      }
    });
    return <div>{horariosDisponibles}</div>;
  };

  const verFechaDisponible = ({ date, view }) => {
    const fechaCountMap = new Map();
    // Iterar sobre el array de reservas y contar las repeticiones de cada fecha
    reservas.forEach((reserva) => {
      const fechaString = reserva.fecha_fin;
      const fechaSinFormatear = parseISO(fechaString);
      const fecha = format(fechaSinFormatear, "yyyy-MM-dd");
      if (fechaCountMap.has(fecha)) {
        fechaCountMap.set(fecha, fechaCountMap.get(fecha) + 1);
      } else {
        fechaCountMap.set(fecha, 1);
      }
    });
    const content = {};
    // Crear el contenido de los tiled basado en el conteo de repeticiones de cada fecha
    fechaCountMap.forEach((count, fecha) => {
      if (count >= horario) {
        content[fecha] = <NoDisponibleTile></NoDisponibleTile>;
      }
    });
    const fecha = format(date, "yyyy-MM-dd");
    return content[fecha] || null;
  };

  const showData = async () => {
    const data = { id_espacio: datosReserva.id };
    const dataReservas = await getReservasDeportes(data);
    setReservas(dataReservas.data);
  };

  useEffect(() => {
    showData();
  }, []);

  useEffect(() => {
    cargarHorario();
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const isTilePintado = verFechaDisponible({ date, view: "month" });
    if (!isTilePintado) {
      setSelectFecha(formattedDate);
      verHorariosDisponibles();
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>
        <div>
          <CalendarContainer>
            <Calendar
              tileContent={verFechaDisponible}
              value={selectFecha ? parseISO(selectFecha) : null}
              onChange={handleDateChange}
            />
          </CalendarContainer>
        </div>
        <div>
        <Label htmlFor="">
            {selectFecha}
          </Label>
          {verHorariosDisponibles()}
          </div>

        <form onSubmit={handleSubmit(onSubmit)}>
         
          <Label>Nombre:</Label>
          <Input type="text" {...register("nombre")} />
          <Label>Apellido:</Label>
          <Input type="text" {...register("apellido")} />
          <Label>Correo:</Label>
          <Input type="text" {...register("correo")} />
          <Label>Celular:</Label>
          <Input type="text" {...register("contacto")} />
          <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>
            Solicitar
          </ButtonBook>
        </form>

        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
