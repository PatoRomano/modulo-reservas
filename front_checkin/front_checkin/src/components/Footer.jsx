import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

const FooterWrapper = styled.footer`
  margin-top: 20%;
  background-color: #f2f2f2;
  padding: 16px;
  text-align: center;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 8px;
`;

const Copyright = styled.span`
  font-size: 14px;
  color: #888888;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <LogoImg src={Logo} />
      <div>
        <Copyright>
          &copy; {new Date().getFullYear()} CHECKIN. Todos los derechos
          reservados.
        </Copyright>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
