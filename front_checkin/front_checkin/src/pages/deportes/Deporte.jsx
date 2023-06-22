import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/deportes.webp"
import CardEspacio from "../../components/CardEspacio";
import { getEmpresasDeportes } from "../../services/espacios/empresas";
import { getTorneos } from "../../services/reservas/reservas";

const Deporte = () => {
  const [empresas, setEmpresas] = useState([]);
  const [torneos, setTorneos] = useState([]);

     //---------obtengo los tipo deporte--------
  const showData = async () => {
    const dataEmpresas = await getEmpresasDeportes();
    setEmpresas(dataEmpresas.data);
    const dataTorneos = await getTorneos();
    setTorneos(dataTorneos.data)
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
                <CardEspacio imageSrc="vasxmas.jpg" title={elemento.nombre} id={elemento.id} tipo = {1}/>
            ))}
            
        </div>
        <table className="tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Deporte</th>
                    <th>Arbitro</th>
                    <th>Instancia</th>
                    <th>Empresa</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {torneos.map((torneo) => (
                    <tr
                      key={torneo.id}
                      className={torneo.disponible === 0 ? "fila-roja" : ""}
                    >
                      <td>{torneo.nombre}</td>
                      <td>{torneo.deporte}</td>
                      <td>{torneo.arbitro}</td>
                      <td>{torneo.instancia}</td>
                      <td>{torneo.empresa}</td>
                      <td>{torneo.activo == 1 ? "Jugando" : "Finalizada"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </>
    )
}
export default Deporte;