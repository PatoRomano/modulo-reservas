import React, { useState, useEffect } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import '../styles/Tabla'


const Tabla = (espacios) => {
    return (
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
                        {espacios.map((espacio) => (
                            <tr key={espacio.id} className={espacio.disponible === 0 ? 'fila-roja' : ''}>
                                <td>
                                    {espacio.nombre}
                                </td>
                                <td>
                                    {espacio.apellido}
                                </td>
                                <td>
                                    {espacio.espacio}
                                </td>
                                <td>
                                    {espacio.fecha}
                                </td>
                                <td>
                                    {espacio.hora_inicio}
                                </td>
                                <td>
                                    {espacio.hora_fin}
                                </td>
                                <td className={espacio.estado === "PENDIENTE" ? 'fila-amarilla' : espacio.estado === 'ACEPTADA' ? 'fila-verde' : 'fila-roja'}>
                                    {espacio.estado}
                                </td>
                                <td>
                                    <div className='btn-container'>
                                        <button className='editar-btn' title='Editar' onClick={() => editarFila(espacio.id)}>
                                            <BsPencilSquare />
                                        </button>
                                        <button className='eliminar-btn' title='Eliminar' onClick={() => eliminarFila(espacio.id)}>
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
    );
};

export default Tabla;