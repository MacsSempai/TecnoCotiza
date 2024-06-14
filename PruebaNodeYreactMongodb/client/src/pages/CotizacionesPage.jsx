import React, { useState } from 'react';
import axios from 'axios';

const CrearCotizacion = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [productos, setProductos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post('http://localhost:4000/api/cotizaciones', {
      usuario_id: usuarioId,
      productos,
    });

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>ID del usuario:</label>
      <input type="text" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} />

      <label>Productos:</label>
      <input type="text" value={productos} onChange={(e) => setProductos(e.target.value)} />

      <button type="submit">Crear cotización</button>
    </form>
  );
};

export default CrearCotizacion;
