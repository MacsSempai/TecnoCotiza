import React, { useEffect } from "react";
import { getProdIdRequet } from "../api/auth";

const MostrarDetalle = ({ match }) => {
  const [producto, setProducto] = useState(null);
  const productoId = match.params.id;

  useEffect(() => {
    async function obtenerCotizacion() {
      try {
        const res = await getProdIdRequet(productoId);
        setProducto(res); // Update productosUser with an array of products

        console.log("resultado", typeof res, res);
      } catch (error) {
        console.error(error);
      }
    }
    obtenerCotizacion();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-bold p-4">
        Detalles del producto
      </h1>

      <div className="flex flex-wrap gap-4 justify">
        {productosUser.map((producto) => (
          <div
            key={producto._id}
            className="product bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-md hover:shadow-lg hover:scale-105 transition-transform "
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              {producto.name}
            </h2>
            <p className="text-gray-600 mb-2">Descripcion: {producto.description}</p>
            <p className="text-gray-600 mb-2">Categoria: {producto.categoria}</p>
            <p className="text-gray-600 mb-2">Tienda: {producto.tiendas}</p>
            <p className="text-gray-600 mb-2">Precio: ${producto.price}</p>

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
    </>
  );
};

export default MostrarDetalle;
