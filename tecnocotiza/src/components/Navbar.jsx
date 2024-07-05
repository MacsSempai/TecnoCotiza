import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import '../css/Navbar.css';
import { FaBars, FaHome, FaUser, FaCog, FaSearch } from 'react-icons/fa';

const DropdownMenu = ({ items }) => {
  return (
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <Link to={`/productlist/${item.name}`} key={index} className="dropdown-item">
          {item.name}
        </Link>
      ))}
    </div>
  );
};

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuItems = {
    hardware: [
      { name: 'Placa madre' },
      { name: 'Ram' },
      { name: 'Almacenamiento' },
      { name: 'Tarjetas de video' },
    ],
    perifericos: [
      { name: 'Teclados' },
      { name: 'Mouses' },
      { name: 'Monitores' },
      { name: 'Audífonos' },
    ],
    dispositivosPortatiles: [
      { name: 'Laptop' },
      { name: 'Smartphone' },
      { name: 'Tablet' },
      { name: 'Wearables' },
    ],
    electronicaConsumo: [
      { name: 'All in one' },
      { name: 'Consolas' },
      { name: 'Televisores' },
      { name: 'Audio' },
    ],
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <FaHome className="navbar-icon" /> TecnoCotiza
      </Link>
      <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars />
      </button>
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/productlist" className="nav-link">Productos</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">Bienvenido {user.nombreUsuario}</li>
              <li className="nav-item">
                <Link to="/cotizaciones" className="nav-link">Cotizaciones</Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={logout} className="nav-link">Cerrar Sesión</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link nav-button">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link nav-button">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
