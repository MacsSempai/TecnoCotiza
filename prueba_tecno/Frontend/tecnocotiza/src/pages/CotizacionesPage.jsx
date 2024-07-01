import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCotizacion } from "../context/CotizacionesContext";
import { getProdIdRequet } from "../api/auth";

const CrearCotizacion = () => {
  const { user } = useAuth();
  // const [idCotizaciones, setIdCotizaciones] = useState([]);
  const [productosUser, setProductosUser] = useState([]); // Initialize as an empty array

  const { getCotizaciones } = useCotizacion();

  useEffect(() => {
    async function obtenerCotizacion() {
      try {
        const dato = user.id;
        const aCotizaciones = []; // Empty array for storing data

        const cotizaciones = await getCotizaciones(dato);

        console.log("Esto es en front end: ", cotizaciones);
        // setIdCotizaciones(cotizaciones);
        console.log("idcotizaciones :", typeof cotizaciones);

        for (let i = 0; i < cotizaciones.length; i++) {
          console.log("esto", cotizaciones[i]);
          const res = await getProdIdRequet(cotizaciones[i]);
          aCotizaciones.push(res.data);
        }
        setProductosUser(aCotizaciones); // Update productosUser with an array of products

        console.log("resultado", typeof aCotizaciones, aCotizaciones);
      } catch (error) {
        console.error(error);
      }

      // // console.log("idcotizzaciones: ", cotizaciones.cotizacionesId)
      // // const  id = cotizaciones.cotizacionesId
      // const res = await getProdIdRequet(cotizaciones)
      // // const res = await axios.get(`/productos/"662a5d9e98aa86df610b75ea"`);
      // console.log("rect producto cotizaciones:", res)
    }
    obtenerCotizacion();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-bold mt-4 mb-10">Bienvido {user.nombreUsuario}, Ya puedes ver tus cotizaciones...</h1>

      <div className="flex flex-wrap gap-4 justify">
        {productosUser.map((producto) => (
          <div
            key={producto._id}
            className="product bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-md hover:shadow-lg hover:scale-105 transition-transform "
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              {producto.name}
            </h2>
            <p className="text-gray-600 mb-2">Categoria: {producto.category}</p>
            <p className="text-gray-600 mb-2">Tienda: {producto.tiendas}</p>
            <p className="text-gray-600 mb-2">Precio: {producto.price}</p>

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

export default CrearCotizacion;
