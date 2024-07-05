import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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
    imagess: product.imagess || product.images_urls || [],
    description: product.description || "Descripción no disponible",
    category: product.category || "Categoría no disponible",
    specifications: flattenSpecifications(product.specifications || {})
  }));
};





const ListaProductos = () => {
  const [productos, setProductos] = useState([]); // List of all products
  const [selectedProducts, setSelectedProducts] = useState([]); // List of selected products

  const [usoFiltro, setUsoFiltro] = useState(False);

  const { user, haceCotizacion } = useAuth();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const rawData = await axios.get("http://localhost:4000/api/productos");
        const normalizedData = normalizeData(rawData);
        const productosOrdenados = normalizedData.sort((a, b) => a.price - b.price);
        setProductos(productosOrdenados);
        console.log("esto es :",productos)
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
      (product) => product._id === productId //(id) => id === productId
    );

    if (productIndex !== -1) {
      // Product already selected, remove it
      updatedSelectedProducts.splice(productIndex, 1);
    } else {
      // Product not selected, add it
      const selectedProduct = productos.find(
        (product) => product._id === productId
      );
      updatedSelectedProducts.push(selectedProduct);
    }

    setSelectedProducts(updatedSelectedProducts);
  };

  const handleAddToSelectedList = () => {
    const misDatos = {
      usuario_id: user.id,
      productos: selectedProducts.map((jsonObject) => jsonObject._id),
    };

    // Handle adding selected products to a list (implementation depends on your needs)
    console.log(
      "Selected products:",
      selectedProducts.map((jsonObject) => jsonObject._id)
    );
    console.log("el user es :", user.id);

    console.log("tipo json", typeof misDatos);
    console.log("datos json", misDatos);

    try {
      // usuario_id,productos
      haceCotizacion(misDatos);
    } catch (error) {
      console.log(error);
    }
    // You can store the selectedProducts in localStorage, database, or display them in a separate list component
  };

  if (!usoFiltro) {
    console.log("El filtro es :", usoFiltro);
    return (
      <div className="container mx-auto max-w-7xl p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center text-gray-600 mb-4">
          Productos Informaticos
        </h1>

        <div className="flex flex-wrap gap-4 justify-center">
          {productos.map((producto) => (
            <div
              key={producto._id}
              className="product bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-md hover:shadow-lg hover:scale-105 transition-transform "
            >
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                {producto._id}
              </h2>
              <p className="text-gray-600 mb-2">
                Category: {producto._id}
              </p>
              <p className="text-gray-600 mb-2">Store: {producto.tiendas}</p>
              <p className="text-gray-600 mb-2">Price: ${producto.price}</p>

              {/* Button to toggle product selection */}
              <button
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={() => handleProductSelection(producto._id)}
              >
                {selectedProducts.find((p) => p._id === producto._id)
                  ? "Deselect"
                  : "Select"}
              </button>

              <a
                href={producto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
              >
                View Product
              </a>
            </div>
          ))}
        </div>

        {/* Button to handle adding selected products to a list */}
        <button
          className="mt-4 bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600"
          disabled={selectedProducts.length === 0}
          onClick={handleAddToSelectedList}
        >
          Add Selected Products ({selectedProducts.length})
        </button>
      </div>
    );
  }
};

export default ListaProductos;
