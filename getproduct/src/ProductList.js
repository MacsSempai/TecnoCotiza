// ProductList.js
import React, { useState, useEffect } from 'react';
import { fetchProductos } from './services/productoService'; // Asegúrate de que la ruta es correcta

const normalizeData = (data) => {
  return data.map(producto => {
    return {
      ...producto,
      price: producto.price ? parseFloat(producto.price.replace(/[^0-9.-]+/g, "")) : 0,
      images: producto.images && Array.isArray(producto.images) ? producto.images.map(image =>
        image.startsWith('//') ? 'https:' + image : image
      ) : []  // Asegura que las imágenes son un array y maneja si no existen
    };
  });
};



function ProductList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const rawData = await fetchProductos();
        const normalizedData = normalizeData(rawData);
        setProductos(normalizedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    cargarProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {productos.map((producto, index) => (
          <div key={producto._id}>
            <h2>{producto.name}</h2>
            <p>Precio: ${producto.price.toFixed(2)}</p>
            <p>Categoría: {producto.category}</p>
            {producto.images && producto.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Imagen ${idx + 1}`} style={{ width: 100, height: 100 }} />
            ))}
            <a href={producto.url} target="_blank" rel="noopener noreferrer">Ver producto</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
