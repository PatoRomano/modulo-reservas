import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp"
const Deporte = () => {
    return (
        <>
        <Header title="Deportes" backgroundImage={ Fondo }></Header>
        <div className="container">
            <h1>Deportes</h1>
        </div>
        </>
    )
}
export default Deporte;