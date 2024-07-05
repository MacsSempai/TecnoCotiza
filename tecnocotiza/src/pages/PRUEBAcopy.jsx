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
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

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

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const filteredProductos = productos.filter((producto) => {
    let matchCategory = !selectedCategory || producto.category === selectedCategory;
    let matchPriceRange = !selectedPriceRange || (
      selectedPriceRange === "0-50" && producto.price >= 0 && producto.price <= 50 ||
      selectedPriceRange === "51-100" && producto.price >= 51 && producto.price <= 100 ||
      selectedPriceRange === "101-200" && producto.price >= 101 && producto.price <= 200 ||
      selectedPriceRange === "201-" && producto.price >= 201
    );
    let matchStore = !selectedStore || producto.store === selectedStore;

    return matchCategory && matchPriceRange && matchStore;
  }).sort((a, b) => a.price - b.price);

  return (
    <div className="container">
      <div className="filters-sidebar">
        <h3>Filtros</h3>
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

        <select
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
          className="filter-select"
        >
          <option value="">Rango de Precio</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201-">Más de $200</option>
        </select>

        <select
          value={selectedStore}
          onChange={handleStoreChange}
          className="filter-select"
        >
          <option value="">Todas las Tiendas</option>
          {/* Replace with actual stores data */}
          <option value="Tienda1">Tienda 1</option>
          <option value="Tienda2">Tienda 2</option>
          <option value="Tienda3">Tienda 3</option>
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
