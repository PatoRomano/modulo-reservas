import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Fondo from "../../assets/salones.webp";
import { getEmpresasSalones } from "../../services/espacios/empresas";
import CardEspacio from "../../components/CardEspacio";
const Salon = () => {
  const [empresas, setEmpresas] = useState([]);
  //---------obtengo los tipo deporte--------
  const showData = async () => {
    const dataEmpresas = await getEmpresasSalones();
    setEmpresas(dataEmpresas.data);
    console.log(dataEmpresas);
  };

  useEffect(() => {
    showData();
  }, []);
  return (
    <>
      <Header title="Salones y Eventos" backgroundImage={Fondo}></Header>
      <div className="container">
        <h1>Salones</h1>
        {empresas.map((elemento) => (
          <CardEspacio imageSrc="vasxmas.jpg" title={elemento.nombre} />
        ))}
      </div>
    </>
  );
};
export default Salon;
