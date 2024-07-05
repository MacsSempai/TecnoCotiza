import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const flattenSpecifications = (specs) => {
  const flatSpecs = {};
  const flatten = (obj, parentKey = "") => {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = parentKey ? `${parentKey} - ${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        flatten(value, newKey);
      } else {
        flatSpecs[newKey] = value;
      }
    }
  };

  flatten(specs);
  return flatSpecs;
};

const parsePrice = (priceStr) => (!priceStr ? 0 : parseInt(priceStr.replace(/[$,.]+/g, ""), 10));

const normalizeData = (data) =>
  data.map((product) => ({
    ...product,
    id: product._id,
    price: parsePrice(product.price),
    oprice: product.price,
    imagess: product.imagess || product.images_urls || [],
    description: product.description || "Descripción no disponible",
    category: product.category || "Categoría no disponible",
    specifications: flattenSpecifications(product.specifications || {}),
  }));

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { user, haceCotizacion } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/productos");
        const normalizedData = normalizeData(response.data);
        setProductos(normalizedData);

        const uniqueCategories = [...new Set(normalizedData.map((producto) => producto.category))];
        setCategorias(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductos();
  }, []);


  const filteredProductos = selectedCategory
    ? productos.filter((producto) => producto.category === selectedCategory).sort((a, b) => a.price - b.price)
    : productos.sort((a, b) => a.price - b.price);

  return (
    <div className="container">
      <h1 className="title">TecnoCotiza</h1>

      <div className="filter-bar">
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="filter-select"
        >
          <option value="">Todas las Categorías</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria} className="filter-option">
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
    {filteredProductos.map((producto) => (
      <Link to={`/productos/detallado/${producto.id}`} key={producto.id} className="product-card-link">
        <div className="product-card">
          <h2 className="product-name">{producto.name}</h2>
          <p className="product-category">Categoría: {producto.category}</p>
          <p className="product-store">Tienda: {producto.tienda}</p>
          <div className="product-price">
            <span className="price-label">Precio:</span>
            <span className="price-value">{producto.oprice}</span>
          </div>
          {producto.imagess.length > 0 && (
            <img src={producto.imagess[0]} alt={`Imagen de producto ${producto.name}`} className="product-image" />
          )}
        </div>
      </Link>
    ))}
  </div>

    </div>
  );
};

export default ListaProductos;
