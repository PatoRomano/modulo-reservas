import React, { useState, useEffect } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import '../styles/Tabla.css'


const Tabla = (reservas) => {
    console.log(reservas)
    return (
        <>
        {reservas.lenght !== 0 ? (
            <>
        <div className="tabla-btn-container">
            <div className="tabla-container">
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Espacio</th>
                            <th>Fecha</th>
                            <th>Hora inicio</th>
                            <th>Hora fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.reservas.map((reserva) => (
                            <tr key={reserva.id} className={reserva.disponible === 0 ? 'fila-roja' : ''}>
                                <td>
                                    {reserva.nombrecliente}
                                </td>
                                <td>
                                    {reserva.apellidocliente}
                                </td>
                                <td>
                                    {reserva.nombre}
                                </td>
                                <td>
                                    {reserva.fecha}
                                </td>
                                <td>
                                    {reserva.hora_inicio}
                                </td>
                                <td>
                                    {reserva.hora_fin}
                                </td>
                                <td className={reserva.estado === "PENDIENTE" ? 'fila-amarilla' : reserva.estado === 'ACEPTADA' ? 'fila-verde' : 'fila-roja'}>
                                    {reserva.estado}
                                </td>
                                <td>
                                    <div className='btn-container'>
                                        <button className='editar-btn' title='Editar' onClick={() => editarFila(reserva.id)}>
                                            <BsPencilSquare />
                                        </button>
                                        <button className='eliminar-btn' title='Eliminar' onClick={() => eliminarFila(reserva.id)}>
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
    ):null}</>
    );
};

export default Tabla;