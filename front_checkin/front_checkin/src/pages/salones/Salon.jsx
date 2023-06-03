import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/salones.webp"
const Salon = () => {
    return (
        <>
        <Header title="Salones y Eventos" backgroundImage={ Fondo }></Header>
        <div className="container">
            <h1>Salones</h1>
        </div>
        </>
    )
}
export default Salon;