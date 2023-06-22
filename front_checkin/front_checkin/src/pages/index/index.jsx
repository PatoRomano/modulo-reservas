import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import Logo from "../../assets/logo.svg";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Alinea las cartas hacia la izquierda */
  margin: -8px; /* Ajusta el margen negativo para reducir el espacio entre las cartas */
`;

const Card = styled.div`
  width: 300px;
  background-color: #c0c0ff3c;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 5%;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  &:hover {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Data = styled.div`
  margin-bottom: 16px;
  &:hover {
    transform: scale(1.1);
  }
`;

const Text = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;
const Titulo = styled(Text)`
  font-weight: bold;
  color: white;
`
const HeaderStyle = styled(Header)`
  background-color: #12128bda;
`
const DataDescripcion = styled(Data)`
  background-color: #00002d73;
`;
const Index = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("mensaje");

  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Ocultar el mensaje después de 5 segundos
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <Header
        title="Reserva al instante, fácil y rápido"
        logoSrc={Logo}
      ></Header>
      {showMessage && message && <p>{message}</p>}
      <div>
        <Container>
          <Card>
            <Image src="/seguridad.jpg" alt="" />
            <Content>
              <DataDescripcion>
                <Data>
                  <Titulo>Confianza</Titulo>
                </Data>
              </DataDescripcion>
              <Data>
                <Text>
                  Confianza y tranquilidad garantizadas. Nuestra página de
                  reservas en línea te ofrece un proceso seguro y transparente.
                  Reserva con confianza y disfruta de una experiencia sin
                  sorpresas desagradables. Trabajamos únicamente con proveedores
                  y empresas que cumplen con altos estándares de calidad y
                  confiabilidad.
                </Text>
              </Data>
            </Content>
          </Card>
          <Card>
            <Image src="/facil.webp" alt="" />
            <Content>
              <DataDescripcion>
                <Data>
                  <Titulo>Sencillez</Titulo>
                </Data>
              </DataDescripcion>
              <Data>
                <Text>
                  Reserva fácilmente y sin complicaciones. Nuestra página de
                  reservas te permite asegurar rápidamente tu lugar en nuestros
                  servicios. Disfruta de una experiencia sencilla y conveniente
                  con solo unos clics.
                </Text>
              </Data>
            </Content>
          </Card>
          <Card>
            <Image src="/mashup.jpg" alt="" />
            <Content>
              <DataDescripcion>
                <Data>
                  <Titulo>Todo en uno</Titulo>
                </Data>
              </DataDescripcion>
              <Data>
                <Text>
                  Reúne en un solo lugar una amplia variedad de servicios
                  ofrecidos por empresas confiables y de calidad. Explora
                  opciones, compara y elige lo que más se adapte a tus
                  necesidades, todo en un único y conveniente destino.
                  Simplifica tu búsqueda y reserva con confianza, sabiendo que
                  estás obteniendo lo mejor de múltiples empresas en un solo
                  clic.
                </Text>
              </Data>
            </Content>
          </Card>
        </Container>
      </div>
    </>
  );
};
export default Index;
