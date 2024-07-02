import React, { useEffect, useState } from "react";
import { getProdIdRequet } from "../api/auth";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const MostrarDetalle = () => {
  const [producto, setProducto] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await getProdIdRequet(id);
        if (response.data) {
          setProducto(response.data);
        } else {
          console.warn("No product found for ID:", id);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % producto.image_urls.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const prevIndex = (currentImageIndex - 1 + producto.image_urls.length) % producto.image_urls.length;
    setCurrentImageIndex(prevIndex);
  };

  return (
    <>
      <h1 className="text-5xl font-bold p-4">Detalles del producto</h1>

      {producto && (
        <div className="flex flex-wrap gap-4 justify-center">
          <div
            key={producto._id || producto.id}
            className="product bg-white border border-gray-300 rounded-lg p-4 w-80 shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">{producto.name}</h2>
            <p className="text-gray-600 mb-2">Descripción: {producto.description}</p>
            {producto.categoria && <p className="text-gray-600 mb-2">Categoría: {producto.categoria}</p>}
            {producto.tiendas && <p className="text-gray-600 mb-2">Tienda: {producto.tiendas}</p>}
            <p className="text-gray-600 mb-2">Precio: {producto.price}</p>

            {/* Image carousel */}
            {producto.image_urls && producto.image_urls.length > 0 && (
              <div className="relative">
                <img
                  src={producto.image_urls[currentImageIndex]}
                  alt={producto.name}
                  className="w-full h-auto object-cover rounded-md"
                />

                {/* Previous and next buttons */}
                <button
                  className="absolute top-1/2 left-0 p-2 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-l-md"
                  onClick={handlePreviousImage}
                  disabled={producto.image_urls.length === 1}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  className="absolute top-1/2 right-0 p-2 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-r-md"
                  onClick={handleNextImage}
                  disabled={producto.image_urls.length === 1}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            )}
            <Link
              to={producto.url}
              target="_blank" //abre una nueva pestaña
              rel="noopener noreferrer" // mantiene el comportamiento del enlace seguro
              className="mt-2 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Ver
            </Link>
          </div>
        </div>
      )}

      {!producto && <p>Cargando detalles del producto...</p>}
    </>
  );
};

export default MostrarDetalle;