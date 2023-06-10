import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp";
import CardEspacio from "../../components/CardEspacio";
import { Link } from 'react-router-dom';
//  <Card key={deporte.id} title={deporte.nombre_publico} 
//  imageSrc={deporte.nombre === "futbol" ? ImageSoccer : deporte.nombre === "paddle" ? ImagePaddle : ImageHandball} />

const Administrador = () => {
    return (
        <>
        <Header title="Administrar espacios" backgroundImage={ Fondo }></Header>
        <div className="container">
            <h1>Tus espacios</h1>
            <Link to="/crearespacio">
            <button>Crear Espacio</button>
            </Link>
        </div>
        </>
    )
}
export default Administrador;