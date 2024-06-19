import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCotizacion } from "../context/CotizacionesContext";

const CrearCotizacion = () => {
  const { user } = useAuth();

  

  const { getCotizaciones } = useCotizacion();

  useEffect(() => {
    async function obtenerCotizacion(){
      const dato = user.id
      const cotizaciones = await getCotizaciones(dato);
      console.log(cotizaciones)
    }
    obtenerCotizacion()
  }, []);

  return (
    <>
      <h1>Bienvido {user.nombreUsuario}, Ya puedes ver tus cotizaciones...</h1>
      <h1>el haydi es {user.id}</h1>
      {/* <h2>{getCotizaciones({usuario_id: user.id})}</h2> */}
    </>
  );
};

export default CrearCotizacion;
