import React, { useState, useEffect } from 'react';
import { fetchProductos } from '../services/productoService';
import ProductItem from './ProducItem';
import './teamplateds_productos.css';
import './Hoja_producto.css';

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

const TablaIzquierda = ({ images }) => {
  return (
    <div className="tabla_izquierda">
      {images.map((img, idx) => (
        <img key={idx} src={img.startsWith('//') ? 'https:' + img : img} alt={`Imagen de producto ${idx + 1}`} />
      ))}
    </div>
  );
};

const TablaMedia = ({ product }) => {
  const { description, price, category, specifications } = product;

  return (
    <div className="tabla_media">
      <h2>{product.name}</h2>
      <div>
        <h2>Características</h2>
        <table>
          <tbody>
            <tr>
              <td>Descripción</td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>Precio</td>
              <td>{price}</td>
            </tr>
            <tr>
              <td>Categoría</td>
              <td>{category}</td>
            </tr>
            {Object.entries(specifications).map(([key, value], idx) => (
              <tr key={idx}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Derecha = ({ url, onBack }) => {
  return (
    <div className="cubo_tiendas_funciones">
      <button onClick={onBack}>Volver</button>
      <div className="Tienda">
        <ul>
          <li>
            <button onClick={() => window.open(url, '_blank')}>Ver producto</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ProductDetails = ({ product, onBack }) => {
  return (
    <div className="container">
      <div className="body">
        <TablaMedia product={product} />
        <TablaIzquierda images={product.images} />
        <Derecha url={product.url} onBack={onBack} />
      </div>
    </div>
  );
};

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const rawData = await fetchProductos();
        console.log("Raw data from fetchProductos:", rawData); // Añadir esta línea
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

  const handleBack = () => {
    setSelectedProduct(null);
  };

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
};

export default ProductList;
