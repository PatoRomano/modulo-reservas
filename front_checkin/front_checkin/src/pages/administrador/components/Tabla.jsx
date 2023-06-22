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
const Tabla = ({reservas, actualizarReservas}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [updatedReservas, setUpdatedReservas] = useState([]);
  const [itemsPerPage] = useState(10);
  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const { id } = isAuthenticated || {};

  const cambiarEstado = async (idR, estado) => {
    let data = { id_reserva: idR, flag: estado, id_usuario: id };
    updateReserva(data);
    const updatedReservas = reservas.map((reserva) => {
      if (reserva.id === idR) {
        return {
          ...reserva,
          estado: estado === 1 ? "ACEPTADA" : estado === 0 ? "RECHAZADA": "FINALIZADA",
        };
      }
      return reserva;
    });
    actualizarReservas(updatedReservas);
  };

  useEffect(() => {
    setUpdatedReservas(reservas);
  }, [reservas]);

  const filteredReservas = reservas.filter((reserva) => {
    // Filtrar por término de búsqueda
    if (
      reserva.nombrecliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.apellidocliente
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reserva.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.estado.toLowerCase().includes(searchTerm.toLowerCase())
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
    const dateA = parseISO(a.fecha);
    const dateB = parseISO(b.fecha);
    return dateB - dateA;
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservas = sortedReservas.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedReservas.length / itemsPerPage);
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
                  {currentReservas.map((reserva) => (
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
                            : reserva.estado === "FINALIZADA"
                            ? "fila-azul"
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
                            onClick={() => cambiarEstado(reserva.id, 1)}
                          >
                            <BsPencilSquare />
                          </button>
                          <button
                            className="eliminar-btn"
                            title="Eliminar"
                            onClick={() => cambiarEstado(reserva.id, 0)}
                          >
                            <FaTrashAlt />
                          </button>
                          <button
                            className="finalizar-btn"
                            title="finalizar"
                            onClick={() => cambiarEstado(reserva.id, 2)}
                          >
                            <AiFillPlusCircle />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &#8592;
                </button>{" "}
                {/* Flecha izquierda */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &#8594;
                </button>{" "}
                {/* Flecha derecha */}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Tabla;
