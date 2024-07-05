import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome } from 'react-icons/fa';
import '../css/Navbar.css';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const isAuthenticated = true; // Cambiar según la lógica de autenticación

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
      <div className="navbar-container">
        <button className="categories-toggle" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
          <FaBars />
        </button>
        <Link to="/" className="navbar-brand">
          <FaHome className="navbar-icon" /> TecnoCotiza
        </Link>
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/productlist" className="nav-link">Productos</Link>
            </li>
            <li className="nav-item">
              <Link to="/cotizaciones" className="nav-link">Cotizaciones</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isCategoriesOpen && (
            <div className="categories-dropdown">
              {Object.keys(menuItems).map((category) => (
                <div key={category} className="menu-category">
                  <button
                    className={`category-button ${activeMenu === category ? 'active' : ''}`}
                    onClick={() => setActiveMenu(activeMenu === category ? null : category)}
                  >
                    {category}
                  </button>
                  {activeMenu === category && <DropdownMenu items={menuItems[category]} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
