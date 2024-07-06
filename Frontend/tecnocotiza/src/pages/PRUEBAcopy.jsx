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
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

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

  const filteredProductos = productos.filter((producto) => {
    let matchCategory = !selectedCategory || producto.category === selectedCategory;
    let matchPriceRange = producto.price >= minPrice && producto.price <= maxPrice;
    let matchStore = !selectedStore || producto.tienda === selectedStore;

    return matchCategory && matchPriceRange && matchStore;
  }).sort((a, b) => a.price - b.price);

  const totalPages = Math.ceil(filteredProductos.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedProducts = filteredProductos.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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
          value={selectedStore}
          onChange={(event) => setSelectedStore(event.target.value)}
          className="filter-select"
        >
          <option value="">Todas las Tiendas</option>
          <option value="cintegral">cintegral</option>
          <option value="pcExpress">pcExpress</option>
          <option value="notebookStore">notebookStore</option>
        </select>

        <div className="price-range">
          <label>Rango de Precio</label>
          <input
            type="range"
            min="0"
            max="10000000"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="price-range-input"
          />
          <input
            type="range"
            min="0"
            max="10000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-range-input"
          />
          <div>
            <span>${minPrice}</span> - <span>${maxPrice}</span>
          </div>
        </div>


      </div>

      <div className="product-grid">
        {displayedProducts.map((producto) => (
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
      
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
    </div>
  );
};

export default ListaProductos;
