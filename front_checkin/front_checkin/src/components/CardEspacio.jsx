import React from 'react';
import '../styled-components/card.css'; // Importa el archivo CSS de estilos


const CardEspacio = ({ imageSrc, title }) => {
    return (
        <div className="card">
            <img src={imageSrc} alt="Image" className="card-image" />
            <div className="card-content">
                <h1>{title}</h1>
            </div>
        </div>
    );
};


export default CardEspacio;