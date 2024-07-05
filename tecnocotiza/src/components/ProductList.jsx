import React, { useState, useEffect } from 'react';
import { fetchProductos } from '../services/productoService';
import ProductItem from './ProductItem';
import CategoriaFiltro from './CategoriaFiltro';
import ProductDetalles from './ProductDetalles';
import '../css/teamplateds_productos.css';
import './Hoja_producto.css';

//----2do que se usa
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

//----Primer uso---------
const normalizeData = (data) => {  
  return data.map(product => ({
    ...product,
    price: parsePrice(product.price),
    imagess: product.imagess || product.imagess_urls || [],
    description: product.description || "Descripción no disponible",
    category: product.category || "Categoría no disponible",
    specifications: flattenSpecifications(product.specifications || {})
  }));
};


const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [categoriaSelec, setCategoriaSelec] = useState('');
  const [producthardware, setProductHardware] = useState(false);
  const [productperifericos, setProductPerifericos] = useState(false);
 

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const rawData = await fetchProductos(); //obtine los procutos get
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

  const handleCategoriaSelec = (event) => {
    setCategoriaSelec(event.target.value);
  };

  const handleProductHardware = (event) => {
    setProductHardware(event.target.checked);
  };
  const handlePerifericos = (event) => {
    setProductPerifericos(event.target.checked);
  };


  const Categorias_hardware = ['Accesorios Electrónica', 'Componentes Electrónicos'];
  const Categorias_perifericos = ['Audifonos Call-Center', 'Audifonos Gamer','Mouse','Enclosure (Cofres)'];

  const productosFiltrados = productos.filter(producto =>
    producto.price >= precioMinimo &&
    (!categoriaSelec || producto.category === categoriaSelec) &&
    (!producthardware || Categorias_hardware.includes(producto.category))&&
    (!productperifericos || Categorias_perifericos.includes(producto.category))
  );

  const categorias = [...new Set(productos.map(producto => producto.category))];

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
      <CategoriaFiltro  
        categorias={categorias}
        categoriaSelec={categoriaSelec}
        onChange={handleCategoriaSelec}
        
      />
      <label>
        <input
          type="checkbox"
          checked={producthardware}
          onChange={handleProductHardware}
        />
        hardware
      </label>
      <label>
        <input
          type="checkbox"
          checked={productperifericos}
          onChange={handlePerifericos}
        />
        Perifericos
      </label>
      {productosFiltrados.map((producto, index) => (
        <ProductItem key={producto._id || index} product={producto} onClick={handleProductClick} />
      ))}
    </div>
  );
};

export default ProductList;