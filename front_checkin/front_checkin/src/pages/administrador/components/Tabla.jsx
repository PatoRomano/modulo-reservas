import React, { useState, useEffect } from "react";
import { eachHourOfInterval, format, parseISO } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import "../styles/Tabla.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { updateReserva } from "../../../services/reservas/reservas";
import { useAuthUser } from "react-auth-kit";

const Input = styled.input`
  width: 40%;
  padding: 8px;
  margin-bottom: 16px;
  margin-right: 15px;
`;
const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  margin-right: 15px;
`;
const Tabla = (reservas) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const { id } = isAuthenticated || {};



  const cambiarEstado = async (idR,estado) => {
    let data = {id_reserva:idR,flag:estado,id_usuario:id}
    updateReserva(data);
  }
  const filteredReservas = reservas.reservas.filter((reserva) => {
    // Filtrar por término de búsqueda
    if (
      reserva.nombrecliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.apellidocliente
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reserva.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      // Filtrar por rango de fechas
      if (selectedDateRange[0] !== null && selectedDateRange[1] !== null) {
        const fechaString = reserva.fecha;
        const fechaSinFormatear = parseISO(fechaString);
        const reservaDate = format(fechaSinFormatear, "yyyy-MM-dd");
        console.log(reservaDate);
        console.log(format(selectedDateRange[0], "yyyy-MM-dd"));
        console.log(format(selectedDateRange[1], "yyyy-MM-dd"));
        return (
          reservaDate >= format(selectedDateRange[0], "yyyy-MM-dd") &&
          reservaDate <= format(selectedDateRange[1], "yyyy-MM-dd")
        );
      }
      return true;
    }
    return false;
  });

  const sortedReservas = filteredReservas.sort((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);
    return dateA - dateB;
  });

  const aceptarFila = (id) => {
    console.log("aceptada " + id);
  };
  const eliminarFila = (id) => {
    console.log("eliminada " + id);
  };
  console.log(reservas);
  const handleDateChange = (date) => {
    setSelectedDateRange(date);
  };

  return (
    <>
      {reservas.lenght !== 0 ? (
        <>
          <div className="tabla-btn-container">
            <div className="tabla-container">
              <div className="search-container">
                <Input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <DatePickerStyled
                  onChange={handleDateChange}
                  startDate={selectedDateRange[0]}
                  endDate={selectedDateRange[1]}
                  selectsRange
                  placeholderText="Selecciona un rango de fechas"
                />
              </div>
              <table className="tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Espacio</th>
                    <th>Fecha</th>
                    <th>Hora inicio</th>
                    <th>Hora fin</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReservas.map((reserva) => (
                    <tr
                      key={reserva.id}
                      className={reserva.disponible === 0 ? "fila-roja" : ""}
                    >
                      <td>{reserva.nombrecliente}</td>
                      <td>{reserva.apellidocliente}</td>
                      <td>{reserva.nombre}</td>
                      <td>{format(parseISO(reserva.fecha), "dd-MM-yyyy")}</td>
                      <td>{reserva.hora_inicio}</td>
                      <td>{reserva.hora_fin}</td>
                      <td
                        className={
                          reserva.estado === "PENDIENTE"
                            ? "fila-amarilla"
                            : reserva.estado === "ACEPTADA"
                            ? "fila-verde"
                            : "fila-roja"
                        }
                      >
                        {reserva.estado}
                      </td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="editar-btn"
                            title="Editar"
                            onClick={() => cambiarEstado(reserva.id,1)}
                          >
                            <BsPencilSquare />
                          </button>
                          <button
                            className="eliminar-btn"
                            title="Eliminar"
                            onClick={() => cambiarEstado(reserva.id,0)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Tabla;
