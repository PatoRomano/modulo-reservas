import React, { useEffect, useState } from "react";
import Fondo from "../../assets/departamentos.webp";
import Header from "../../components/Header";
import { getEmpresasDepartamentos } from "../../services/espacios/empresas";
import CardEspacio from "../../components/CardEspacio";

const Departamento = () => {
  const [empresas, setEmpresas] = useState([]);
  //---------obtengo los tipo deporte--------
  const showData = async () => {
    const dataEmpresas = await getEmpresasDepartamentos();
    setEmpresas(dataEmpresas.data);
    console.log(dataEmpresas);
  };

  useEffect(() => {
    showData();
  }, []);
  return (
    <>
      <Header title="Departamentos" backgroundImage={Fondo}></Header>
      <div className="container">
        <h1>Departamentos</h1>
        {empresas.map((elemento) => (
          <CardEspacio imageSrc="vasxmas.jpg" title={elemento.nombre} tipo = {2} />
        ))}
      </div>
    </>
  );
};
export default Departamento;
