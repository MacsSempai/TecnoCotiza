import React from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import notebook from '../imagenes/notebook.png';
import ps5 from '../imagenes/ps5.png';
import smartphone from '../imagenes/smarphone.png';
import tarjeta from '../imagenes/tarjeta.png';

const Main = () => {
  const navigate = useNavigate();
  
  const categoriasPopulares = [
    { nombre: 'Notebooks', descripcion: 'Trabaja en cualquier lugar', imagen: notebook, ruta: '/notebooks' },
    { nombre: 'PS5', descripcion: 'Lo último de Artículos de Consolas', imagen: ps5, ruta: '/productos consolas' },
    { nombre: 'Smartphones', descripcion: 'Escoge el equipo perfecto para ti', imagen: smartphone, ruta: '/celulares' },
    { nombre: 'Componentes de PC', descripcion: 'Los mejores Componentes de PC', imagen: tarjeta, ruta: '/tarjeta video' },
  ];

  const handleClick = (categoria) => {
    if (categoria.ruta !== '#') {
      navigate(categoria.ruta);
    } else {
      alert(`Has hecho clic en ${categoria.nombre}`);
    }
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
