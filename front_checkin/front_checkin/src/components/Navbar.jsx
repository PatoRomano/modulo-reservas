import React, { useImperativeHandle } from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="nav">
            <Link to="/" className='site-title'>Checkin</Link>
            <ul>
                <CustomLink to="/deportes">Deportes</CustomLink>
                <CustomLink to="/departamentos">Departamentos</CustomLink>
                <CustomLink to="/salones">Salones</CustomLink>
                <CustomLink to="/administrador">Administrador</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }){
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch({path: resolvePath.pathname, end: true});
    const path= window.location.pathname;
    return(
        <li className={isActive ? "acitve" : ""}>
            <Link to={to}{...props}>{children}</Link>
        </li>
    );
}

export default Navbar;

