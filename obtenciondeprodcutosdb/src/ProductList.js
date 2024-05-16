import React, { useState, useEffect } from 'react';
import { fetchProductos } from './services/productoService';

const flattenSpecifications = (specs) => {
  const flatSpecs = {};
  const flatten = (obj, parentKey = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = parentKey ? `${parentKey} - ${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        flatten(value, newKey);
      } else {
        flatSpecs[newKey] = value;
      }
    }
  };

  flatten(specs);
  return flatSpecs;
};

const parsePrice = (priceStr) => {
  if (!priceStr) return "0";
  const cleanedPrice = parseInt(priceStr.replace(/[$,.]+/g, ""), 10);
  return cleanedPrice.toLocaleString();
};

const normalizeData = (data) => {
  return data.map(product => ({
    ...product,
    price: parsePrice(product.price),
    images: product.images || product.image_urls || [],
    description: product.description || "Descripción no disponible",
    specifications: flattenSpecifications(product.specifications || {})
  }));
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
      {productos.map((producto, index) => (
        <div key={producto._id || index}>
          <h2>{producto.name}</h2>
          <p>{producto.description}</p>
          <p>Precio: {producto.price}</p>
          <p>Categoría: {producto.category}</p>
          {producto.images.map((img, idx) => (
            <img key={idx} src={img.startsWith('//') ? 'https:' + img : img} alt={`Imagen de producto ${idx + 1}`} style={{ width: 100, height: 100 }} />
          ))}
          {Object.keys(producto.specifications).length > 0 && (
            <div>
              <h3>Especificaciones:</h3>
              {Object.entries(producto.specifications).map(([key, value], idx) => (
                <p key={idx}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          )}
          <a href={producto.url} target="_blank" rel="noopener noreferrer">Ver producto</a>
        </div>
      ))}
    </div>
  );
}

export default ProductList;







