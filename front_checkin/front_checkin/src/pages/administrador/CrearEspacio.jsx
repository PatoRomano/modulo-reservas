import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ButtonBook from "../../components/ButtonBook"
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
            <Input type="text" {...register("nombre_salon")} />
            <Label>Capacidad:</Label>
            <Input type="number" {...register("capacidad_salon")} />
            <Label>servicios:</Label>
            <Input type="text" {...register("servicio_salon")} />
            <Label>precio:</Label>
            <Input type="number" {...register("precio_salon")} />
          </>
        )}
        {selectedOption === "cancha" && (
          <>
            <Label>Cancha:</Label>
            <Input type="text" {...register("nombre_cancha")} />
            <Label>Deporte:</Label>
            <Input type="text" {...register("deporte")} />
            <Label>Tipo:</Label>
            <Input type="text" {...register("tipo")} />
            <Label>Capacidad:</Label>
            <Input type="number" {...register("capacidad_cancha")} />
            <Label>Precio:</Label>
            <Input type="number" {...register("precio_cancha")} />
          </>
        )}
        {selectedOption === "departamento" && (
          <>
            <Label>Nombre:</Label>
            <Input type="text" {...register("nombre_departamento")} />
            <Label>Servicios:</Label>
            <Input type="text" {...register("servicio_departamento")} />
            <Label>Numero de camas:</Label>
            <Input type="number" {...register("camas")} />
            <Label>Capacidad:</Label>
            <Input type="number" {...register("capacidad_departamento")} />
            <Label>Precio:</Label>
            <Input type="number" {...register("precio_departamento")} />
          </>
        )}

       
        <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>Guardar</ButtonBook>
      </form>
      <br />
    </FormContainer>
  );
};

export default CrearEspacio;
