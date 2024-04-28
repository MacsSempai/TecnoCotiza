import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [hardwareSubMenuVisible, setHardwareSubMenuVisible] = useState(false);
  const [perifericosSubMenuVisible, setPerifericosSubMenuVisible] = useState(false);
  const [dispositivosPortatilesSubMenuVisible, setDispositivosPortatilesSubMenuVisible] = useState(false);
  const [electronicaConsumoSubMenuVisible, setElectronicaConsumoSubMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleHardwareSubMenu = () => {
    setHardwareSubMenuVisible(!hardwareSubMenuVisible);
  };

  const togglePerifericosSubMenu = () => {
    setPerifericosSubMenuVisible(!perifericosSubMenuVisible);
  };

  const toggleDispositivosPortatilesSubMenu = () => {
    setDispositivosPortatilesSubMenuVisible(!dispositivosPortatilesSubMenuVisible);
  };

  const toggleElectronicaConsumoSubMenu = () => {
    setElectronicaConsumoSubMenuVisible(!electronicaConsumoSubMenuVisible);
  };

  const redirectToPage = (page) => {
    // Aquí puedes manejar la redirección a la página correspondiente
    console.log(`Redireccionando a la página ${page}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu">
          {/* Aquí se incluyen los otros botones y el buscador */}
          <div className="navbar-additional">
            <button className="navbar-button">Inicio</button>
            <input type="text" placeholder="Buscar" className="navbar-search" />
            {/* Agregamos el botón "Desplegar" aquí */}
            <button className="navbar-button" onClick={toggleMenu}>
              Desplegar
            </button>
            <button className="navbar-button">Usuario</button>
            <button className="navbar-button">Configuración</button>
          </div>
          {/* Aquí se incluye el primer submenú desplegable */}
          {menuVisible && (
            <ul className="nav-menu">
              <li>
                <button onClick={toggleHardwareSubMenu}>Hardware</button>
                {hardwareSubMenuVisible && (
                  <ul className="nav-submenu">
                    <li>
                      <button onClick={() => redirectToPage("Placa madre")}>Placa madre</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Ram")}>Ram</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Almacenamiento")}>Almacenamiento</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Tarjetas de video")}>Tarjetas de video</button>
                    </li>
                  </ul>
                )}
                <button onClick={togglePerifericosSubMenu}>Periféricos</button>
                {perifericosSubMenuVisible && (
                  <ul className="nav-submenu">
                    <li>
                      <button onClick={() => redirectToPage("Teclados")}>Teclados</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Mouses")}>Mouses</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Monitores")}>Monitores</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Audífonos")}>Audífonos</button>
                    </li>
                  </ul>
                )}
                <button onClick={toggleDispositivosPortatilesSubMenu}>Dispositivos portátiles</button>
                {dispositivosPortatilesSubMenuVisible && (
                  <ul className="nav-submenu">
                    <li>
                      <button onClick={() => redirectToPage("Laptop")}>Laptop</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Smartphone")}>Smartphone</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Tablet")}>Tablet</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Wearables")}>Wearables</button>
                    </li>
                  </ul>
                )}
                <button onClick={toggleElectronicaConsumoSubMenu}>Electrónica de consumo</button>
                {electronicaConsumoSubMenuVisible && (
                  <ul className="nav-submenu">
                    <li>
                      <button onClick={() => redirectToPage("All in one")}>All in one</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Consolas")}>Consolas</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Televisores")}>Televisores</button>
                    </li>
                    <li>
                      <button onClick={() => redirectToPage("Audio")}>Audio</button>
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
