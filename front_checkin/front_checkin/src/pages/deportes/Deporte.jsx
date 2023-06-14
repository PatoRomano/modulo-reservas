import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp"
import CardEspacio from "../../components/CardEspacio";
import { getEmpresasDeportes } from "../../services/espacios/empresas";
const Deporte = () => {
  const [empresas, setEmpresas] = useState([]);
     //---------obtengo los tipo deporte--------
  const showData = async () => {
    const dataEmpresas = await getEmpresasDeportes();
    setEmpresas(dataEmpresas.data);
  };

  useEffect(() => {
    showData();
  }, []);
  //--------------------------------------//
    return (
        <>
        <Header title="Deportes" backgroundImage={ Fondo }></Header>
        <div className="container">
            <h1>Deportes</h1>
            {empresas.map((elemento)=>(
                <CardEspacio imageSrc="vasxmas.jpg" title={elemento.nombre} id={elemento.id}/>
            ))}
            
        </div>
        </>
    )
}
export default Deporte;