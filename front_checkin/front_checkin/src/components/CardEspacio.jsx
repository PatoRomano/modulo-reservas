import React from 'react';
import '../styled-components/card.css'; // Importa el archivo CSS de estilos
import { Link, useParams } from 'react-router-dom';
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
const CardEspacio = ({ imageSrc, title, precio, id, tipo}) => {
    return (
        <div className="card">
            <img src={imageSrc} alt="Image" className="card-image" />
            <div className="card-content">
                <h1>{title}</h1>
            </div>
            {precio ? (
            <div className="card-content">
                <h3>{precio}</h3>
            </div>) : null}
            
            <Link to={`/reserva/${id}/${tipo}`}>
           
            <Button>Seleccionar</Button>
          
            
            </Link>
        </div>
    );
};


export default CardEspacio;