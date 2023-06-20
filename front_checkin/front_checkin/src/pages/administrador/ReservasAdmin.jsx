import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ButtonBook from "../../components/ButtonBook";
import Select from "react-select";
import { getEspaciosPorEmpresa } from "../../services/espacios/espacio";
import { saveReservasVisitante } from "../../services/reservas/reservas";
import { useAuthUser } from "react-auth-kit";
import { useNavigate  } from "react-router-dom";

const Container = styled.div`
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 5%;
  margin-bottom: 5%;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding-top: 15px;
`;
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
`;

const ReservasAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  //-----obtengo los datos del usuario logeado
  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const { empresa } = isAuthenticated || {};
  const navigate = useNavigate();

  //-------

  //---------obtengo los tipo deporte--------
  const setEspacios = async () => {
    const data = { id_empresa: empresa };
    const response = await getEspaciosPorEmpresa(data);
    const espacios = response.data.map((item) => ({
      value: item.id,
      label: item.nombre,
    }));
    console.log(espacios);
    setOptions(espacios);
  };
  useEffect(() => {
    setEspacios();
  }, []);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  //--------------------------------------//
  const onSubmit = async (data) => {
    const jsonData = {"nombre":data.nombre,"apellido":data.apellido,
    "correo":data.correo, "contacto":data.contacto,
    "id_espacio":selectedOption.value, "hora_inicio":data.hora,"hora_fin":data.hora,"dni": data.dni,"fecha":data.fecha_fin};
    try{
      saveReservasVisitante(jsonData)
    }catch{
      console.log("error: "+error)
      return;
    }
    const message = 'Reserva solicitada';
    navigate(`/administrador?mensaje=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <h2>Registrar Reserva</h2>
      <Container>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <div>
              <Label>Espacio:</Label>
              <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder="Espacio"
              />
              <Label>Nombre:</Label>
              <Input
                type="text"
                {...register("nombre")}
                {...register("nombre", { required: "Campo obligatorio" })}
              />
              {errors.nombre && <ErrorMsg>{errors.nombre.message}</ErrorMsg>}

              <Label>Apellido:</Label>
              <Input
                type="text"
                {...register("apellido")}
                {...register("apellido", { required: "Campo obligatorio" })}
              />
              {errors.apellido && (
                <ErrorMsg>{errors.apellido.message}</ErrorMsg>
              )}

              <Label>DNI:</Label>
              <Input
                type="number"
                {...register("dni")}
                {...register("dni", { required: "Campo obligatorio" })}
              />
              {errors.dni && <ErrorMsg>{errors.dni.message}</ErrorMsg>}

              <Label>Correo:</Label>
              <Input
                type="text"
                {...register("correo")}
                {...register("correo", { required: "Campo obligatorio" })}
              />
              {errors.correo && <ErrorMsg>{errors.correo.message}</ErrorMsg>}

              <Label>Celular:</Label>
              <Input
                type="number"
                {...register("contacto")}
                {...register("contacto", { required: "Campo obligatorio" })}
              />
              {errors.contacto && (
                <ErrorMsg>{errors.contacto.message}</ErrorMsg>
              )}
            </div>
            <div>
              <Label>Desde:</Label>
              <Input
                type="date"
                {...register("fecha_inicio")}
                {...register("fecha_inicio", { required: "Campo obligatorio" })}
              />
              {errors.fecha_inicio && (
                <ErrorMsg>{errors.fecha_inicio.message}</ErrorMsg>
              )}

              <Label>Hasta:</Label>
              <Input
                type="date"
                {...register("fecha_fin")}
                {...register("fecha_fin", { required: "Campo obligatorio" })}
              />
              {errors.fecha_fin && (
                <ErrorMsg>{errors.fecha_fin.message}</ErrorMsg>
              )}

              <Label>Hora:</Label>
              <Input
                type="time"
                {...register("hora")}
                {...register("hora", { required: "Campo obligatorio" })}
              />
              {errors.hora && (
                <ErrorMsg>{errors.hora.message}</ErrorMsg>
              )}
              <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>
                Registrar
              </ButtonBook>
            </div>

            <br />
          </FormContainer>
        </form>
      </Container>
    </>
  );
};

export default ReservasAdmin;
