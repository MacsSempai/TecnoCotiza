
import React from 'react';
import RegistroUsers from './registroUsers'; // Ajusta la ruta de importación según la estructura de tu proyecto
import Navbar from './components/Navbar';
import { TbLayoutNavbar } from 'react-icons/tb';
import Cotizacion from './components/Cotizacion';
import Hoja_producto from './components/Hoja_producto';
import Main from './components/Main';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Main></Main>
      <Footer></Footer>
      
      
    </div>
  );
}

export default App;