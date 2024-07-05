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

// ----3ro uso-----
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[$,.]+/g, ""), 10);
};

//----Primer uso---------
const normalizeData = (data) => {
  return data.map((product) => ({
    ...product,
    id: product._id,
    price: parsePrice(product.price),
    oprice:product.price,
    images: product.images || product.image_urls || [],
    description: product.description || "Descripción no disponible",
    category: product.category || "Categoría no disponible",
    specifications: flattenSpecifications(product.specifications || {}),
  }));
};

const ListaProductos = () => {
  const [productos, setProductos] = useState([]); // List of all products
  const [selectedProducts, setSelectedProducts] = useState([]); // List of selected product IDs

  const { user, haceCotizacion } = useAuth();

  const navigate = useNavigate();



  const [categorias, setCategorias] = useState([]); // List of unique categories
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/productos");
        console.log("react pruductos:", response.data);
        const normalizedData = normalizeData(response.data);
        const productosOrdenados = normalizedData.sort(
          (a, b) => a.price - b.price
        );
        setProductos(productosOrdenados);

        //  Extract unique categories efficiently
        const uniqueCategories = [...new Set(normalizedData.map((producto) => producto.category))];
        setCategorias(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleProductSelection = (productId) => {
    // Toggle selection for the product with the given ID
    const updatedSelectedProducts = [...selectedProducts];
    const productIndex = updatedSelectedProducts.findIndex(
      (id) => id === productId
    );

    if (productIndex !== -1) {
      // Product already selected, remove it
      updatedSelectedProducts.splice(productIndex, 1);
    } else {
      // Product not selected, add it
      updatedSelectedProducts.push(productId);
    }

    setSelectedProducts(updatedSelectedProducts);
  };

  const handleAddToSelectedList = async () => {
    if (selectedProducts.length === 0) {
      console.warn(
        "No products selected. Please select products to create a quotation."
      );
      return; // Prevent unnecessary API call if no products are selected
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
      console.log("Quotation created successfully:", response.data); // Handle success response if needed
      // You can display a success message, redirect to a confirmation page, etc.

      // Optionally clear selected products after successful submission
      setSelectedProducts([]);
    } catch (error) {
      console.log("Error creating quotation:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };




  return (
    <div className="container mx-auto max-w-7xl p-4 bg-gray-100 rounded-lg shadow-md">
      {/* <h1 className="text-center text-gray-600 mb-4">Productos Informaticos</h1> */}
      <h1 className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl mb-4 text-center">
        TecnoCotiza
      </h1>


     {/* Filter bar with static options and dynamic categories */}
     <div className="flex justify-between mb-4">
        <select
          className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Todas las Categorias</option>
          <option value="computadoras">Computadoras</option>
          <option value="tablets">Tablets</option>
          <option value="teclados">Teclados</option>
          {/* Add more static options as needed */}
        </select>

        {categorias.length > 0 && (
          <select
            className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Filtrar por Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        )}
      </div>



      <div className="flex flex-wrap gap-4 justify-center">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="product bg-white border border-gray-300 rounded-lg p-4 w-80 shadow-md hover:shadow-lg hover:scale-105 transition-transform "
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              {producto.name}
            </h2>
            <p className="text-gray-600 mb-2">Categoria: {producto.category}</p>
            <p className="text-gray-600 mb-2">Tienda: {producto.tiendas}</p>
            {/* <p className="text-gray-600 mb-2">Precio: {producto.oprice}</p> */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Precio:</span>
              <span className="text-lg font-bold text-green-500">{producto.oprice}</span>
            </div>
            {producto.images && producto.images.length > 0 && (
              <img
                src={producto.images[0]} // Display the first image only
                alt={`Imagen de producto 1`}
                className="product-image"
              />
            )}
            {/* Button to toggle product selection */}
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
              // target="_blank" //abre una nueva pestaña
              // rel="noopener noreferrer" // mantiene el comportamiento del enlace seguro
              className="mt-2 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Detalles
            </Link>
          </div>
        ))}
      </div>

      {/* Button to handle adding selected products to a list */}

      {/* <button
        className="mt-4 bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600"
        disabled={selectedProducts.length === 0}
        onClick={handleAddToSelectedList}
      >
        Add Selected Products ({selectedProducts.length})
      </button> */}
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
