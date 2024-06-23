import React from 'react';
import CategoriaProductos from './components/CategoriaProductos';
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
      <ProductList></ProductList>
      <Footer></Footer>
      
      
    </div>
  );
}

export default App;