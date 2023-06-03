import React, { useEffect, useState } from "react";

import Styled from "styled-components";

const HeaderContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 300px;
  position: relative;
`;

const BackgroundImage = Styled.div`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

const ContentContainer = Styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
`;


const Title = Styled.h1`
  font-size: 54px;
  margin-left: 10px;
  color : #FFFFFF;
`;

const Subtitle = Styled.h3`
  font-size: 24px;
  margin-left: 10px;
`;

const Logo = Styled.img`
  height: 200px;
  width: 300px;
`;

// Componente de encabezado reutilizable
const Header = ({ title, subtitle, logoSrc, backgroundImage }) => {
  return (
    <>
      <HeaderContainer>
      <BackgroundImage  backgroundImage={backgroundImage} />
      <ContentContainer>
        {logoSrc && <Logo src={logoSrc} alt="Logo" />}
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </ContentContainer>
    </HeaderContainer>
    </>
  );
};

export default Header;
