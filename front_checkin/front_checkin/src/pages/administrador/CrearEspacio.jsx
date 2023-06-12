import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ButtonBook from "../../components/ButtonBook";
import { getTiposDeportes, getTipos } from "../../services/tipos/tipos";
import { saveEspacio } from "../../services/espacios/espacio";
import { useAuthUser } from "react-auth-kit";

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
`;
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const ErrorMsg = styled.p`
  color: red;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  margin-top: 16px;
`;

const CrearEspacio = () => {
  const { register, handleSubmit } = useForm();
  const [selectedOption, setSelectedOption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [deportes, setDeportes] = useState([]);
  //-----obtengo los datos del usuario logeado
  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const { empresa } = isAuthenticated || {};
  //-------


  //---------obtengo los tipo deporte--------
  const showData = async () => {
    const dataDeportes = await getTiposDeportes();
    setDeportes(dataDeportes.data);
  };

  useEffect(() => {
    showData();
  }, []);
  //--------------------------------------//

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  //controlar hora inicio y hora fin
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setError("");
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    setError("");
  };

  const onSubmit = (data) => {
    if (startTime === "" || endTime === "") {
      setError("Debe tener un horarios asignado");
    } else if (startTime >= endTime) {
      setError("El horario asignado no es válido");
    } else {
      data['id_empresa'] = empresa;
      console.log(data);
      saveEspacio(data);
    }
  }


  return (
    <Container>
      <FormContainer>
        <h2>Registrar espacio</h2>
        <form onSubmit={handleSubmit}>
          <Label>Imagen:</Label>
          <Input
            type="file"
            {...register("image")}
            onChange={handleImageChange}
          />
          {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
          <Label>Espacio:</Label>
          <Select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Seleccione una opción</option>
            <option value="salon">Salon</option>
            <option value="cancha">Cancha</option>
            <option value="departamento">Departamento</option>
          </Select>
          {selectedOption === "salon" && (
            <>
              <Label>Nombre:</Label>
              <Input type="text" {...register("nombre")} />
              <Label>precio:</Label>
              <Input type="number" {...register("precio_hora")} />
              <Input type="number" value="3" {...register("id_tipo")} hidden/>
            </>
          )}
          {selectedOption === "cancha" && (
            <>
              <Label>Cancha:</Label>
              <Input type="text" {...register("nombre")} />
              <Label>Tipo:</Label>
              <Select
                {...register("id_tipo", {
                  required: true,
                })}
              >
                {deportes.map((elemento) => (
                  <option key={elemento.id} value={elemento.id}>
                    {elemento.nombre}
                  </option>
                ))}
              </Select>
              <Label>Capacidad:</Label>
              <Input type="number" {...register("capacidad")} />
              <Label>Precio:</Label>
              <Input type="number" {...register("precio_hora")} />
            </>
          )}
          {selectedOption === "departamento" && (
            <>
              <Label>Nombre:</Label>
              <Input type="text" {...register("nombre")} />
              <Label>Servicios:</Label>
              <Input type="text" {...register("servicio_departamento")} />
              <Label>Numero de camas:</Label>
              <Input type="number" {...register("camas")} />
              <Label>Capacidad:</Label>
              <Input type="number" {...register("capacidad")} />
              <Label>Precio:</Label>
              <Input type="number" {...register("precio_hora")} />
              <Input type="number" value="2" {...register("id_tipo")} hidden/>
            </>
          )}

          <Label>Hora inicio:</Label>
          <Input
            type="time"
            {...register("hora_inicio")}
            step="1800"
            onChange={handleStartTimeChange}
          />
          <Label>Hora fin:</Label>
          <Input
            type="time"
            {...register("hora_fin")}
            step="1800"
            onChange={handleEndTimeChange}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>
            Guardar
          </ButtonBook>
        </form>
        <br />
      </FormContainer>
    </Container>
  );
};

export default CrearEspacio;
