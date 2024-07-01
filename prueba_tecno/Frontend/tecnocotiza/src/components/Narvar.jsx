import React, { useState } from 'react';

import './Narvar.css';
import { FaBars, FaHome, FaUser, FaCog, FaSearch,FaSomeIcon } from 'react-icons/fa';

const DropdownMenu = ({ items }) => {
  return (
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <button key={index} className="dropdown-item" onClick={() => console.log(`Redireccionando a la página: ${item.name}`)}>
          {item.name}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
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
      <div className="navbar-container">
        <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
        )}
        <div className="navbar-end">
          <div className="navbar-search-container">
            <input type="text" placeholder="Buscar" className="navbar-search" />
            <FaSearch className="search-icon" />
          </div>
          <button className="navbar-button"><FaUser /> Usuario</button>
          <button className="navbar-button"><FaCog /> Configuración</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;