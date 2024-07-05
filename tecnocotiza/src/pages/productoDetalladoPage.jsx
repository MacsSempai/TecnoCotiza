import React, { useEffect, useState } from "react";
import { getProdIdRequet } from "../api/auth";
import { useParams, Link } from "react-router-dom";
import '../css/Productos.css'; // Importamos el archivo CSS

const MostrarDetalle = () => {
  const [producto, setProducto] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const { data } = await getProdIdRequet(id);
        if (data) {
          setProducto(data);
        } else {
          setError("No product found.");
        }
      } catch (error) {
        setError("Error fetching product details.");
      }
    };

    obtenerProducto();
  }, [id]);

  const handleNextImage = () => {
    if (producto.images_urls && producto.images_urls.length > 0) {
      setCurrentImageIndex((currentImageIndex + 1) % producto.images_urls.length);
    }
  };

  const handlePreviousImage = () => {
    if (producto.images_urls && producto.images_urls.length > 0) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + producto.images_urls.length) % producto.images_urls.length
      );
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!producto.name) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <>
      <h1 className="titulo">Detalles del producto</h1>
      <div className="producto-container">
        <div key={producto._id || producto.id} className="producto">
          <h2 className="producto-nombre">{producto.name}</h2>
          <p className="producto-descripcion">Descripción: {producto.description}</p>
          {producto.category && <p className="producto-categoria">Categoría: {producto.category}</p>}
          {producto.tiendas && <p className="producto-tienda">Tienda: {producto.tiendas}</p>}
          <div className="producto-precio">
            <span className="producto-precio-label">Precio:</span>
            <span className="producto-precio-valor">{producto.price}</span>
          </div>
          {producto.images_urls && producto.images_urls.length > 0 && (
            <div className="imagen-container">
              <button onClick={handlePreviousImage} aria-label="Previous Image">{"<"}</button>
              <img
                src={producto.images_urls[currentImageIndex]}
                alt={producto.name}
                className="imagen"
              />
              <button onClick={handleNextImage} aria-label="Next Image">{">"}</button>
            </div>
          )}
          <Link
            to={producto.url}
            target="_blank"
            rel="noopener noreferrer"
            className="producto-enlace"
          >
            Ver
          </Link>
        </div>
      </div>
    </>
  );
};

export default MostrarDetalle;
