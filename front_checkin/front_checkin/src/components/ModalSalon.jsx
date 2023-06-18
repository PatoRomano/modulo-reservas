import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ButtonBook from "./ButtonBook";
import {
  getReservasDeportes,
  saveReservasVisitante,
} from "../services/reservas/reservas";
import Calendar from "react-calendar";
import { eachHourOfInterval, format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

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
  grid-template-columns: 2fr 0.2fr 1fr; /* Dos columnas de igual tamaño */
  gap: 20px; /* Espacio entre las columnas */
  background-color: #fff;
  padding: 20px;
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
  pointer-events: none;

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
const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const ModalSalon = ({ onClose, children, datosReserva }) => {
  const { register, handleSubmit } = useForm();
  const [reservas, setReservas] = useState([]);
  const [selectFecha, setSelectFecha] = useState(null);
  const [mañana, setMañana] = useState("");
  const [noche, setNoche] = useState("");
  const [fechasReservadasNoche, setFechasNoches] = useState([])
  const [fechasReservadasMañana, setFechasMañana] = useState([])
  const navigate = useNavigate();

  function verTurnoDisponible (reserva) {
    let fecha ="";
    if(reserva.hora_fin == "17:00:00"){
        fecha=format(parseISO(reserva.fecha_inicio), "yyyy-MM-dd")
        fechasReservadasMañana.push(fecha)
    }else{
        fecha=format(parseISO(reserva.fecha_inicio), "yyyy-MM-dd")
        fechasReservadasNoche.push(fecha);
    }
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

      if (count >= 2) {
        content[fecha] = <NoDisponibleTile></NoDisponibleTile>;
      }
    });
    const fecha = format(date, "yyyy-MM-dd");
    return content[fecha] || null;
  };

  const showData = async () => {
    const data = { id_espacio: datosReserva.id };
    const dataReservas = await getReservasDeportes(data);
    dataReservas.data.map((reserva)=>{
        verTurnoDisponible(reserva)
    });
    setReservas(dataReservas.data);
  };

  useEffect(() => {
    showData();
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log(fechasReservadasNoche)
    setNoche("")
    setMañana("")
    if(fechasReservadasNoche.includes(formattedDate)){
        setNoche("No mostrar");
    }
    if(fechasReservadasMañana.includes(formattedDate)){
        setMañana("No mostrar");
    }
    const isTilePintado = verFechaDisponible({ date, view: "month" });
    if (!isTilePintado) {
      setSelectFecha(formattedDate);
    }
  };

  const onSubmit = async (data, e) => {
    let hora_inicio = "";
    let hora_fin = "";
    if(data.turno == "mañana"){
        hora_inicio = "09:00:00";
        hora_fin = "17:00:00";
    }
    else if(data.turno == "noche"){
        hora_inicio = "19:00:00";
        hora_fin = "02:00:00";
    }else{
        return null;
    }
    const jsonData = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      contacto: data.contacto,
      id_espacio: datosReserva.id,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      dni: data.dni,
      fecha: selectFecha,
    };
        saveReservasVisitante(jsonData);
        const message = "Reserva solicitada";
        navigate(`/?mensaje=${encodeURIComponent(message)}`);
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
              minDate={new Date()}
            />
          </CalendarContainer>
        </div>
        <div>
          <Label htmlFor="">{selectFecha}</Label>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Nombre:</Label>
          <Input type="text" {...register("nombre")} />
          <Label>Apellido:</Label>
          <Input type="text" {...register("apellido")} />
          <Label>DNI:</Label>
          <Input type="number" {...register("dni")} />
          <Label>Correo:</Label>
          <Input type="text" {...register("correo")} />
          <Label>Celular:</Label>
          <Input type="text" {...register("contacto")} />
          <Select {...register("turno")}>
            <option>Seleccione una opción</option>
            {mañana == "" ? (<option value="mañana" >Mañana</option>): null}
            {noche == "" ? ( <option value="noche">Noche</option>): null}          
          </Select>
          <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>
            Solicitar
          </ButtonBook>
        </form>

        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalSalon;
