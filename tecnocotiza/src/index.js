import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'; // Importamos el componente Navbar

ReactDOM.render(
  <React.StrictMode>
    <Navbar /> {/* Renderizamos el componente Navbar en lugar de App */}
  </React.StrictMode>,
  document.getElementById('root')
);
