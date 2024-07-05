import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProdIdRequet } from "../api/auth";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import '../css/Productos.css';

const MostrarDetalle = () => {
  const [producto, setProducto] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleNextImage = useCallback(() => {
    if (producto.images_urls?.length) {
      setCurrentImageIndex((currentImageIndex + 1) % producto.images_urls.length);
    }
  }, [currentImageIndex, producto.images_urls]);

  const handlePreviousImage = useCallback(() => {
    if (producto.images_urls?.length) {
      setCurrentImageIndex((currentImageIndex - 1 + producto.images_urls.length) % producto.images_urls.length);
    }
  }, [currentImageIndex, producto.images_urls]);

  const handleAddToQuotation = async () => {
    if (!user) {
      navigate("/register");
      return;
    }

    const dataToSend = { usuario_id: user.id, productos: [producto._id] };

    try {
      const response = await axios.post("http://localhost:4000/api/cotizaciones", dataToSend);
      console.log("Quotation created successfully:", response.data);
      navigate("/cotizaciones");
    } catch (error) {
      console.log("Error creating quotation:", error);
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
        <div className="producto" key={producto._id || producto.id}>
          <h2 className="producto-nombre">{producto.name}</h2>
          <p className="producto-descripcion">Descripción: {producto.description}</p>
          {producto.category && <p className="producto-categoria">Categoría: {producto.category}</p>}
          {producto.tienda && <p className="producto-tienda">Tienda: {producto.tienda}</p>}
          <div className="producto-precio">
            <span className="producto-precio-label">Precio:</span>
            <span className="producto-precio-valor">{producto.price}</span>
          </div>
          {producto.images_urls?.length > 0 && (
            <div className="imagen-container">
              <img
                src={producto.images_urls[currentImageIndex]}
                alt={producto.name}
                className="imagen"
              />
            </div>
          )}
          <button onClick={handleAddToQuotation} className="producto-enlace">
            Agregar a cotizaciones
          </button>
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
