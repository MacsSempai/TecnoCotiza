import React, { useState, useEffect } from 'react';
import { fetchProductos } from '../services/productoService';
import ProductItem from './ProductItem';
import ProductDetalles from './ProductDetalles';
import './teamplateds_productos.css';
import './Hoja_producto.css';

// ----2do que se usa
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

// ----3ro uso-----
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[$,.]+/g, ""), 10);
}; 

// ----Primer uso---------
const normalizeData = (data) => {  
  return data.map(product => ({
    ...product,
    price: parsePrice(product.price),
    images: product.images || product.images_urls || [],
    description: product.description || "Descripción no disponible",
    category: product.category || "Categoría no disponible",
    specifications: flattenSpecifications(product.specifications || {})
  }));
};

const Productos_Consolas = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [precioMinimo, setPrecioMinimo] = useState(0);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const rawData = await fetchProductos(); // Obtiene los productos
        console.log("Raw data from fetchProductos:", rawData);

        const normalizedData = normalizeData(rawData);
        const productosOrdenados = normalizedData.sort((a, b) => a.price - b.price);
        setProductos(productosOrdenados);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    cargarProductos();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handlePrecioMinimoChange = (event) => {
    setPrecioMinimo(parseInt(event.target.value, 10));
  };

  const Categoria_consolas= ['Accesorios para Consolas'];

  const productosFiltrados = productos.filter(producto =>
    producto.price >= precioMinimo &&
    Categoria_consolas.includes(producto.category)
  );

  if (selectedProduct) {
    return <ProductDetalles product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="product-list">
      <h1>Productos</h1>
      <div className="input-container">
        <label className="range-label" htmlFor="precio-minimo">Precios</label>
        <input
          type="range"
          id="precio-minimo"
          min="0"
          max="10000"
          step="100"
          value={precioMinimo}
          onChange={handlePrecioMinimoChange}
          className="range-input"
        />
      </div>
      {productosFiltrados.map((producto, index) => (
        <ProductItem key={producto._id || index} product={producto} onClick={handleProductClick} />
      ))}
    </div>
  );
};

export default Productos_Consolas;
