import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componente principal que muestra un carrusel de productos
const Main = () => {
  // Datos de marcador de posición para los productos
  const products = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    { id: 3, name: 'Producto 3' },
    // Agrega más productos aquí si es necesario
  ];

  return (
    // Utiliza la etiqueta <div> en lugar de <body> para evitar conflictos con el HTML del documento
    <div>
      <Carousel>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            {/* Botón que lleva al usuario a la sección del producto específico */}
            <Button variant="primary" href={`#product-${product.id}`}>
              {product.name}
            </Button>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Main;
