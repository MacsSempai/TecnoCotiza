// App.js
import React from 'react';
import ProductList from './ProductList'; // Asegúrate de que la ruta de importación sea correcta porfa seguir el patron de las carpetas

function App() {
  return (
    <div className="App">
      <h1>¡Bienvenido a Nuestra Tienda!</h1>
      <ProductList />
    </div>
  );
}

export default App;