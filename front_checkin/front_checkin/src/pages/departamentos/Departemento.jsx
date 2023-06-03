import React, { useEffect, useState } from "react";
import Fondo from "../../assets/departamentos.webp";
import Header from "../../components/Header";
const Departamento = () => {
    return (
        <>
        <Header title="Departamentos" backgroundImage={ Fondo }></Header>
        <div className="container">
            <h1>Departamentos</h1>
        </div>
        </>
    )
}
export default Departamento;