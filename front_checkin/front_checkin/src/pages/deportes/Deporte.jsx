import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp"
import CardEspacio from "../../components/CardEspacio";

const Deporte = () => {
    return (
        <>
        <Header title="Deportes" backgroundImage={ Fondo }></Header>
        <div className="container">
            <h1>Deportes</h1>
            <CardEspacio imageSrc="vasxmas.jpg" title="Vas x Mas" />
            
        </div>
        </>
    )
}
export default Deporte;