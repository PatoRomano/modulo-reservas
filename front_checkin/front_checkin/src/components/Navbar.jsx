import React, { useImperativeHandle, useState, useEffect } from "react";
import {
  Link,
  useResolvedPath,
  useMatch,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuthUser, RequireAuth, useSignOut } from "react-auth-kit";
import styled from "styled-components"

//----------- estilos ------------

const NavbarContainer = styled.nav`
  /* Estilos del navbar */
`;

const SiteTitle = styled(Link)`
  /* Estilos del título del sitio */
`;

const NavList = styled.ul`
  /* Estilos de la lista de enlaces */
`;

const UserProfile = styled.li`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.span`
  margin-left: 10px;
`;

//-------------- componente -------------------


const Navbar = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login";
  const navigate = useNavigate();
  //verificamos que este atentificado y si es así obtenemos los datos
  const authUser = useAuthUser();
  const isAuthenticated = authUser();
  const singOut = useSignOut();
  const { nombre, apellido } = isAuthenticated || {};

  const logout = () => {
    singOut();
    navigate("/");
  };

  if (hideNavbar) {
    return null; // Si estás en "/login-form", no muestra el navbar
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Checkin
      </Link>
      <ul>
        <CustomLink to="/deportes">Deportes</CustomLink>
        <CustomLink to="/departamentos">Departamentos</CustomLink>
        <CustomLink to="/salones">Salones</CustomLink>
        {isAuthenticated && (
          <CustomLink to="/administrador">Administrar</CustomLink>
        )}
        {isAuthenticated && <button onClick={logout}>Cerrar Sesión</button>}
        {isAuthenticated && (
          <UserProfile>
            <UserAvatar>
            <img src="vasxmas.jpg" alt={nombre} />
            </UserAvatar>
            <UserName>{nombre}</UserName>
          </UserProfile>
        )}
        {!isAuthenticated && <CustomLink to="/login">Inciar Sesión</CustomLink>}
      </ul>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });
  const path = window.location.pathname;
  return (
    <li className={isActive ? "acitve" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
