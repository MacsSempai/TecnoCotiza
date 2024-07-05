import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[$,.]+/g, ""), 10);
};

const normalizeData = (data) => {
  return data.map((product) => ({
    ...product,
    id: product._id,
    price: parsePrice(product.price),
    oprice: product.price,
    images: product.images || product.image_urls || [],
    description: product.description || "Descripción no disponible",
    category: product.category || "Categoría no disponible",
    specifications: flattenSpecifications(product.specifications || {}),
  }));
};

const ListaProductos = () => {
  const [productos, setProductos] = useState([]); 
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const [categorias, setCategorias] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(""); 

  const { user, haceCotizacion } = useAuth();

  const navigate = useNavigate();

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/productos");
        const normalizedData = normalizeData(response.data);
        setProductos(normalizedData);

        const uniqueCategories = [
          ...new Set(normalizedData.map((producto) => producto.category)),
        ];
        setCategorias(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleProductSelection = (productId) => {
    const updatedSelectedProducts = [...selectedProducts];
    const productIndex = updatedSelectedProducts.findIndex(
      (id) => id === productId
    );

    if (productIndex !== -1) {
      updatedSelectedProducts.splice(productIndex, 1);
    } else {
      updatedSelectedProducts.push(productId);
    }

    setSelectedProducts(updatedSelectedProducts);
  };

  const handleAddToSelectedList = async () => {
    if (selectedProducts.length === 0) {
      console.warn(
        "No products selected. Please select products to create a quotation."
      );
      return;
    }

    if (user === null) {
      return navigate("/register");
    }

    const dataToSend = {
      usuario_id: user.id,
      productos: selectedProducts,
    };

    try {
      console.log("Guardando cotizacion");
      const response = await axios.post(
        "http://localhost:4000/api/cotizaciones",
        dataToSend
      );
      console.log("Quotation created successfully:", response.data);
      setSelectedProducts([]);
    } catch (error) {
      console.log("Error creating quotation:", error);
    }
  };

  const filteredProductos = selectedCategory
    ? productos
        .filter((producto) => producto.category === selectedCategory)
        .sort((a, b) => a.price - b.price)
    : productos.sort((a, b) => a.price - b.price);

  // Obtener los productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductos.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredProductos.length / productsPerPage);

  return (
    <div className="container mx-auto max-w-7xl p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl mb-4 text-center">
        TecnoCotiza
      </h1>

      <div className="flex justify-between mb-4">
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
        >
          <option value="">Todas las Categorias</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria} className="text-black">
              {categoria}
            </option>
          ))}
        </select>
      </div>
    
      <div className="flex flex-wrap gap-4 justify-center">
        {currentProducts.map((producto) => (
          <div
            key={producto.id}
            className="product bg-white border border-gray-300 rounded-lg p-4 w-80 shadow-md hover:shadow-lg hover:scale-105 transition-transform "
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              {producto.name}
            </h2>
            <p className="text-gray-600 mb-2">Categoria: {producto.category}</p>
            <p className="text-gray-600 mb-2">Tienda: {producto.tiendas}</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Precio:</span>
              <span className="text-lg font-bold text-green-500">
                {producto.oprice}
              </span>
            </div>
            {producto.images && producto.images.length > 0 && (
              <img
                src={producto.images[0]}
                alt={`Imagen de producto 1`}
                className="product-image"
              />
            )}
            <button
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => handleProductSelection(producto._id)}
            >
              {selectedProducts.includes(producto._id)
                ? "Excluir"
                : "Seleccionar"}
            </button>
            <Link
              key={producto.id}
              to={`/productos/detallado/${producto.id}`}
              className="mt-2 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Detalles
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-400"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-gray-800 font-medium py-2 px-4">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-400"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
        disabled={selectedProducts.length === 0}
        onClick={handleAddToSelectedList}
      >
        Agregar a cotizaciones({selectedProducts.length})
      </button>
    </div>
  );
};

export default ListaProductos;
