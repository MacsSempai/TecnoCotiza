import React from 'react';
 // Ajusta la ruta de importación según la estructura de tu proyecto
import Narvar from './components/Narvar';
import { TbLayoutNavbar } from 'react-icons/tb';
import Cotizacion from './components/Cotizacion';
import Hoja_producto from './components/Hoja_producto';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Narvar></Narvar>
      <Hoja_producto></Hoja_producto>
      <Footer></Footer>
      
      
    </div>
  );
}

export default App;