import React, { useState } from 'react';
import './Navbar.css';


function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSubMenuEnter = (subMenu) => {
    setActiveSubMenu(subMenu);
  };

  const handleSubMenuLeave = () => {
    setActiveSubMenu(null);
  };

  const redirectToPage = (category, page) => {
    // Aquí se manejar la redirección a la página correspondiente
    console.log(`Redireccionando a la página de ${category}: ${page}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu">
          <div className="navbar-additional">
            <button className="navbar-button">Inicio</button>
            <input type="text" placeholder="Buscar" className="navbar-search" />
            <button className="navbar-button" onClick={toggleMenu}>
              Desplegar
            </button>
            <button className="navbar-button">Usuario</button>
            <button className="navbar-button">Configuración</button>
          </div>
          {menuVisible && (
            <ul className="nav-menu">
              <li>
                <button
                  className="navbar-button"
                  onMouseEnter={() => handleSubMenuEnter("hardware")}
                  onMouseLeave={handleSubMenuLeave}
                >
                  Hardware
                </button>
                {activeSubMenu === "hardware" && (
                  <ul className="nav-submenu" onMouseEnter={() => handleSubMenuEnter("hardware")} onMouseLeave={handleSubMenuLeave}>
                    <li>
                      <button onClick={() => redirectToPage("Hardware", "Placa madre")}>Placa madre</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Hardware", "Ram")}>Ram</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Hardware", "Almacenamiento")}>Almacenamiento</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Hardware", "Tarjetas de video")}>Tarjetas de video</button>
                    </li>
                  </ul>
                )}
                <button
                  className="navbar-button"
                  onMouseEnter={() => handleSubMenuEnter("perifericos")}
                  onMouseLeave={handleSubMenuLeave}
                >
                  Periféricos
                </button>
                {activeSubMenu === "perifericos" && (
                  <ul className="nav-submenu" onMouseEnter={() => handleSubMenuEnter("perifericos")} onMouseLeave={handleSubMenuLeave}>
                    <li>
                      <button onClick={() => redirectToPage("Periféricos", "Teclados")}>Teclados</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Periféricos", "Mouses")}>Mouses</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Periféricos", "Monitores")}>Monitores</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Periféricos", "Audífonos")}>Audífonos</button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="navbar-button"
                  onMouseEnter={() => handleSubMenuEnter("dispositivosPortatiles")}
                  onMouseLeave={handleSubMenuLeave}
                >
                  Dispositivos portátiles
                </button>
                {activeSubMenu === "dispositivosPortatiles" && (
                  <ul className="nav-submenu" onMouseEnter={() => handleSubMenuEnter("dispositivosPortatiles")} onMouseLeave={handleSubMenuLeave}>
                    <li>
                      <button onClick={() => redirectToPage("Dispositivos portátiles", "Laptop")}>Laptop</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Dispositivos portátiles", "Smartphone")}>Smartphone</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Dispositivos portátiles", "Tablet")}>Tablet</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Dispositivos portátiles", "Wearables")}>Wearables</button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="navbar-button"
                  onMouseEnter={() => handleSubMenuEnter("electronicaConsumo")}
                  onMouseLeave={handleSubMenuLeave}
                >
                  Electrónica de consumo
                </button>
                {activeSubMenu === "electronicaConsumo" && (
                  <ul className="nav-submenu" onMouseEnter={() => handleSubMenuEnter("electronicaConsumo")} onMouseLeave={handleSubMenuLeave}>
                    <li>
                      <button onClick={() => redirectToPage("Electrónica de consumo", "All in one")}>All in one</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Electrónica de consumo", "Consolas")}>Consolas</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Electrónica de consumo", "Televisores")}>Televisores</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Electrónica de consumo", "Audio")}>Audio</button>
                    </li>
                  </ul>
                )}
              </li>
              
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
