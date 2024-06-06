import React from 'react';
import './Main.css'; // Asegúrate de importar tu archivo CSS

const Main = () => {
  const categoriasPopulares = [
    { nombre: 'Notebooks', descripcion: 'Trabaja en cualquier lugar', imagen: 'notebook.jpg' },
    { nombre: 'PS5', descripcion: 'Lo último de Sony', imagen: 'ps5.jpg' },
    { nombre: 'Smartphones', descripcion: 'Escoge el equipo perfecto para ti', imagen: 'smartphone.jpg' },
    { nombre: 'Tarjetas gráficas', descripcion: 'Las mejores tarjetas', imagen: 'tarjeta_grafica.jpg' },
  ];

  const handleClick = (categoria) => {
    alert(`Has hecho clic en ${categoria.nombre}`);
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Categorías Populares</h1>
      <div className="main-categorias">
        {categoriasPopulares.map((categoria, index) => (
          <div key={index} className="main-categoria">
            <div className="main-categoria-info">
              <h2>{categoria.nombre}</h2>
              <p>{categoria.descripcion}</p>
              <button onClick={() => handleClick(categoria)}>Haz clic aquí</button>
            </div>
            <div className="main-categoria-imagen">
              <img src={categoria.imagen} alt={categoria.nombre} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
