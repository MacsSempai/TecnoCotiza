import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import '../css/Narvar.css';
import { FaBars, FaHome, FaUser, FaCog, FaSearch,FaSomeIcon } from 'react-icons/fa';


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
    <nav className="bg-zing-700 my-3 flex justify-between py-10 px-10 rounded-lg">
      {/* <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars />
        </button>
        <div className="navbar-brand">
          <FaHome /> Inicio
        </div>
        {isMenuOpen && (
          <div className="menu-despegable">
            {Object.keys(menuItems).map((category) => (
              <div key={category} className="menu-category">
                <button
                  className={`category-button ${activeMenu === category ? 'active' : ''}`}
                  onMouseEnter={() => setActiveMenu(category)}
                >
                  {category}
                </button>
                {activeMenu === category && <DropdownMenu items={menuItems[category]} />}
              </div>
            ))}
          </div>
        )} */}
      <Link to="/productos">
        <h1 className="text-2xl font-bold px-3">TecnoCotiza</h1>
      </Link>
      
      <ul className="flex gap-x-4">
       
        {isAuthenticated ? (
          <>
            <li>Bienvenido {user.nombreUsuario}</li>
            <li>
              <Link to="/cotizaciones">Cotizaciones</Link>
            </li>
            
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Cerrar Sesion
              </Link>
            </li>
          </>
        ) : (
          <>
          
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">Register</Link>
            </li>
          </>
        )}
         <li>
          <Link to="/productlist">Productos</Link>
        </li>
      </ul>
      {/* <div className="navbar-end">
          <div className="navbar-search-container">
            <input type="text" placeholder="Buscar" className="navbar-search" />
            <FaSearch className="search-icon" />
          </div>
          <button className="navbar-button"><FaUser /> Usuario</button>
          <button className="navbar-button"><FaCog /> Configuración</button>
        </div> */}
    </nav>
  );
}

export default Navbar;
