import React, { useState, useEffect } from 'react';
import { fetchProductos } from '../services/productoService';
import ProductItem from './ProducItem';
import './teamplateds_productos.css';

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

const ProductDetails = ({ product, onBack }) => {
  return (
    <div className="product-details">
      <button onClick={onBack}>Volver</button>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: {product.price}</p>
      <p>Categoría: {product.category}</p>
      {product.images.map((img, idx) => (
        <img key={idx} src={img.startsWith('//') ? 'https:' + img : img} alt={`Imagen de producto ${idx + 1}`} className="product-image" />
      ))}
      {Object.keys(product.specifications).length > 0 && (
        <div className="product-specifications">
          <h3>Especificaciones:</h3>
          {Object.entries(product.specifications).map(([key, value], idx) => (
            <p key={idx}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      )}
      <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-link">Ver producto</a>
    </div>
  );
};
function ProductList() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const handleBack= ()=>{
    setSelectedProduct(null);
  }
  if (selectedProduct) {
    return <ProductDetails product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="product-list">
      <h1>Productos</h1>
      {productos.map((producto, index) => (
        <ProductItem key={producto._id || index} product={producto} onClick={handleProductClick} />
      ))}
    </div>
  );
}

export default ProductList;







