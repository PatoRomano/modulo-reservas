import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ButtonBook from "../../components/ButtonBook";
import Select from "react-select";
import { getEspaciosById } from "../../services/espacios/espacio";
import { saveReservasVisitante } from "../../services/reservas/reservas";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useParams } from "react-router-dom";

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

const EditarEspacio = () => {
  const { id, tipo} = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const [espacio, setEspacio] = useState("");
  //-----obtengo los datos del usuario logeado
  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const navigate = useNavigate();

  //-------
  const showData = async () => {
    const data = { id_espacio: id };
    const response = await getEspaciosById(data);
    setValue("nombre", response.data[0].nombre);
    setValue("hora_inicio", response.data[0].hora_inicio);
    setValue("hora_fin", response.data[0].hora_fin);
    setValue("descripcion", response.data[0].descripcion);
    setValue("precio_hora", response.data[0].precio_hora);
    setValue("id_estado", response.data[0].id_estado);
    setValue("id_espacio",id);

  }
  useEffect(() => {
    showData();
  }, [id, setValue]);

  //--------------------------------------//
  const onSubmit = async (data) => {
    // const jsonData = {
    //   nombre: data.nombre,
    //   apellido: data.apellido,
    //   correo: data.correo,
    //   contacto: data.contacto,
    //   id_espacio: selectedOption.value,
    //   hora_inicio: data.hora,
    //   hora_fin: data.hora,
    //   dni: data.dni,
    //   fecha: data.fecha_fin,
    // };
    // try {
    //   saveReservasVisitante(jsonData);
    // } catch (error) {
    //   console.log("error: " + error);
    //   return;
    // }
    // const message = "Reserva solicitada";
    // navigate(`/administrador?mensaje=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <h2>Registrar Reserva</h2>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            <div>
              <Label>Nombre:</Label>
              <Input
                type="text"
                {...register("nombre")}
                {...register("nombre", { required: "Campo obligatorio" })}
              />
              {errors.nombre && <ErrorMsg>{errors.nombre.message}</ErrorMsg>}

              <Label>Descripcion:</Label>
              <textarea
                rows={10}
                cols={40}
                type="text"
                {...register("descripcion")}
                {...register("descripcion", { required: "Campo obligatorio" })}
              />
              {errors.descripcion && (
                <ErrorMsg>{errors.descripcion.message}</ErrorMsg>
              )}

              <Label>Precio:</Label>
              <Input
                type="number"
                {...register("precio_hora")}
                {...register("precio_hora", { required: "Campo obligatorio" })}
              />
              {errors.precio_hora && <ErrorMsg>{errors.precio_hora.message}</ErrorMsg>}

              <Label>Hora incio:</Label>
              <Input
                type="time"
                {...register("hora_inicio")}
                {...register("hora_inicio", { required: "Campo obligatorio" })}
              />
              {errors.hora_inicio && <ErrorMsg>{errors.hora_inicio.message}</ErrorMsg>}

              <Label>Hora fin:</Label>
              <Input
                type="time"
                {...register("hora_fin")}
                {...register("hora_fin", { required: "Campo obligatorio" })}
              />
              {errors.hora_fin && <ErrorMsg>{errors.hora_fin.message}</ErrorMsg>}

              <select {...register("id_estado", { required: "Campo obligatorio" })}>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
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

export default EditarEspacio;
