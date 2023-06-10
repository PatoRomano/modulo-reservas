import React from 'react';
import '../styled-components/card.css'; // Importa el archivo CSS de estilos
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: #ffffff;
  cursor: pointer;
  
  &:hover {
    background-color: #0d8bf2;
  }
`;
const CardEspacio = ({ imageSrc, title }) => {
    return (
        <div className="card">
            <img src={imageSrc} alt="Image" className="card-image" />
            <div className="card-content">
                <h1>{title}</h1>
            </div>
            <Link to='/reserva'>
            <Button>Reservar</Button>
            </Link>
        </div>
    );
};


export default CardEspacio;