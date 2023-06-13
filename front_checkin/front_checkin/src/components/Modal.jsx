import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ButtonBook from "./ButtonBook";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas de igual tamaño */
  gap: 20px; /* Espacio entre las columnas */
  background-color: #fff;
  padding: 20px;
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Modal = ({ onClose, children }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <ModalContainer>
        
      <ModalContent>
      <CloseButton onClick={onClose}>x</CloseButton>
        <div>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="">Fecha</Label>
          <Input type="date" {...register("fecha")} />

          <ButtonBook type="submit" onButtonClick={handleSubmit(onSubmit)}>
            Guardar
          </ButtonBook>
          
        </form>
        </div>
        {children}
        <div>
        
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
