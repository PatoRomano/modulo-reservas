import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ButtonBook from "./ButtonBook";
import {
  getReservasDeportes,
  saveReservasVisitante,
  getArbitros,
} from "../services/reservas/reservas";
import Calendar from "react-calendar";
import { eachHourOfInterval, format, parseISO, addDays  } from "date-fns";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Select from "react-select";
import ButtonCancel from "./ButtonCancel";

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
  background-color: gray;
  cursor: pointer;
  margin: 5px;
  border-radius: 15px;
  height: 30px;
  width: 140px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const CardNoDisponible = styled.button`
  display: flex;
  flex-direction: column;
  background-color: red;
  pointer-events: none;
  margin: 5px;
  border-radius: 15px;
  height: 30px;
  width: 140px;
  text-align: center;
  justify-content: center;
  align-items: center;
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
const DisponibleTile = styled(TileContentContainer)`
  background-color: #41e175;
  color: white;
  pointer-events: none;
`;
const ContLabel = styled.div`
  background-color: #6747c1;
  border-radius: 25px;
  color:white !important;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  margin-top: 8px;
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
  .react-calendar__tile:disabled {
    background-color: #cbffdd;
  }
  .react-calendar__tile {
    padding: 0;
    margin: 0;
    background-color: #41e175;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #b91c1c;
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
    width: 20px; /* Ajusta el ancho según tus necesidades */
    height: 60px; /* Ajusta la altura según tus necesidades */
  }
`;
const Container = styled.div`
  margin-bottom: 16px;
`;

const RadioLabel = styled.label`
  margin-right: 8px;
`;

const RadioButton = styled.input`
  margin-right: 4px;
`;

const ModalContentWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;

const AdvertisementLeft = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-image: url("publicidad-1.png");
  background-position: center center;
  background-size: cover;
  background-repeat: repeat;
`;

const AdvertisementRight = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: url("publicidad-1.png");
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
`;
const H5 = styled.h5`
  font-size: 10px;
`

const ModalDeporte = ({ onClose, children, datosReserva }) => {
  const { register, handleSubmit } = useForm();
  const [reservas, setReservas] = useState([]);
  const [selectFecha, setSelectFecha] = useState(null);
  const [horario, setHorario] = useState("");
  const [hora, setHora] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isArbitroSelected, setIsArbitroSelected] = useState(false);
  //ASIGNO ARBITROS
  const setArbitros = async () => {
    const response = await getArbitros();
    console.log(response.data.arbitros);
    const arbitros = response.data.arbitros.map((item) => ({
      value: item.nombre + " " + item.apellido,
      label: item.nombre + " " + item.apellido,
    }));

    setOptions(arbitros);
  };
  useEffect(() => {
    setArbitros();
  }, []);
  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };
  //FIN ASIGNO ARBITROS
  //MODAL

  const ConfirmationModal = ({ isOpen, onCloseModal, onConfirm }) => {
    const handleRadioChange = (event) => {
      setIsArbitroSelected(event.target.value === "si");
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        contentLabel="Confirmación"
      >
        <ModalContentWrapper>
          <Container>
            <h2>¿Jugara con arbitro?</h2>
            <p>El mismo tendra un costo extra</p>
            <RadioLabel>
              <RadioButton
                type="radio"
                name="arbitro"
                value="si"
                checked={isArbitroSelected}
                onChange={handleRadioChange}
              />
              Sí
            </RadioLabel>
            <RadioLabel>
              <RadioButton
                type="radio"
                name="arbitro"
                value="no"
                checked={!isArbitroSelected}
                onChange={handleRadioChange}
              />
              No
            </RadioLabel>
          </Container>

          {isArbitroSelected && (
            <div>
              <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder="Arbitros"
              />
            </div>
          )}

          <AdvertisementLeft>
            -----------------------------------------------------------
          </AdvertisementLeft>
          <AdvertisementRight>
            -----------------------------------------------------------
          </AdvertisementRight>

          <p>¿Pedir Reserva?</p>
          <ButtonBook onButtonClick={onConfirm}>Solicitar</ButtonBook>
          <ButtonCancel onButtonClick={onCloseModal}>Cancelar</ButtonCancel>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </ModalContentWrapper>
      </Modal>
    );
  };
  //FIN MODAL
  //MANEJO MODAL CONFIRMACIÖN
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    if (isArbitroSelected) {
      jsonData.descripcion = "Arbitro: " + selectedOption.value;
    } else {
      jsonData.descripcion = "Arbitro: No solicito";
    }
    try {
      saveReservasVisitante(jsonData);
      console.log(jsonData);
    } catch {
      console.log("error: " + error);
      return;
    }
    const message = "Reserva solicitada";
    navigate(`/?mensaje=${encodeURIComponent(message)}`);
  };
  //FIN MANEJO ARBITROS

  function handleHora(fhora) {
    if (hora == fhora) {
      setHora("");
    } else {
      setHora(fhora);
    }
  }

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

    const fechaInicio = new Date();
    fechaInicio.setHours(horasInicio, minutosInicio, segundosInicio);

    const fechaFin = new Date();
    fechaFin.setHours(horasFin, minutosFin, segundosFin);

    const fechaInicioModificada = new Date(fechaInicio);
    fechaInicioModificada.setHours(fechaInicio.getHours() + 1);

    const fechaFinModificada = new Date(fechaFin);
    fechaFinModificada.setHours(fechaFin.getHours() + 1);

    const horas = eachHourOfInterval({
      start: fechaInicioModificada,
      end: fechaFinModificada,
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
      if (reservasHorarios.includes(fhora)) {
        return (
          <>
            <CardNoDisponible key={fhora}>{fhora}</CardNoDisponible>
          </>
        );
      } else {
        return (
          <>
            <CardDisponible
              value={fhora}
              type=""
              key={fhora}
              onClick={() => {
                handleHora(fhora);
              }}
            >
              {fhora}
            </CardDisponible>
          </>
        );
      }
    });
    return <div>{horariosDisponibles}</div>;
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    return date < today;
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
    isDateDisabled();
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const isTilePintado = verFechaDisponible({ date, view: "month" });
    if (!isTilePintado) {
      setSelectFecha(formattedDate);
      verHorariosDisponibles();
    }
  };

  const onSubmit = async (data, e) => {
    if (
      data.nombre != "" &&
      data.apellido != "" &&
      data.correo != "" &&
      data.contacto != "" &&
      selectFecha != "" &&
      data.dni != "" &&
      hora != ""
    ) {
      const jsonData = {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        contacto: data.contacto,
        id_espacio: datosReserva.id,
        hora_inicio: hora,
        hora_fin: hora,
        dni: data.dni,
        fecha: selectFecha,
      };
      setJsonData(jsonData);
      handleOpenModal(jsonData);
      e.preventDefault();
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>
        <div>
          <CalendarContainer>
            <Calendar
              tileDisabled={isDateDisabled}
              tileContent={verFechaDisponible}
              value={selectFecha ? parseISO(selectFecha) : null}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={addDays(new Date(),30)}
            />
          </CalendarContainer>
          <H5> Seleccione la fecha y hora de su reserva</H5>
          <H5>
            Seleccione la fecha que desee. Si la fecha aparece en rojo,
            significa que no está disponible. Una vez seleccionada la fecha, se
            mostrarán los horarios disponibles. Para seleccionar un horario,
            haga clic en la hora deseada.
          </H5>
          <H5>Complete su solicitud de reserva</H5>
          <H5>
            Por último, para concretar la solicitud de reserva, complete los
            campos requeridos con sus datos y haga clic en "Solicitar".
          </H5>
        </div>
        <div>
          <ContLabel>
            <h3>Fecha de reserva</h3>
            <Label htmlFor="">{selectFecha}</Label>
          </ContLabel>
          {selectFecha ? verHorariosDisponibles() : null}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ContLabel>
            <Label>{hora} HS</Label>
          </ContLabel>
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
          <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>
            Solicitar
          </ButtonBook>
        </form>
        <ConfirmationModal
          isOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          onConfirm={handleConfirm}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalDeporte;
