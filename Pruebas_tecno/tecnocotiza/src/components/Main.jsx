import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Main.css'; // Importa tu archivo CSS

const Main = () => {
  const categoriasPopulares = [
    { nombre: 'Notebooks', descripcion: 'Trabaja en cualquier lugar', imagen: '/images/notebook.png' },
    { nombre: 'PS5', descripcion: 'Lo último de Sony', imagen: '/images/ps5.jpg' },
    { nombre: 'Smartphones', descripcion: 'Escoge el equipo perfecto para ti', imagen: '/images/smartphone.jpg' },
    { nombre: 'Tarjetas gráficas', descripcion: 'Las mejores tarjetas', imagen: '/images/tarjeta.jpg' },
  ];

  const [masVistos, setMasVistos] = useState([]);

  useEffect(() => {
    const fetchMasVistos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/mas-vistos');
        const data = await response.json();
        setMasVistos(data);
      } catch (error) {
        console.error('Error al obtener los productos más vistos:', error);
      }
    };

    fetchMasVistos();
  }, []);

  const handleClickCategoria = (categoria) => {
    alert(`Has hecho clic en ${categoria.nombre}`);
  };

  const handleClickProducto = (producto) => {
    alert(`Has hecho clic en ${producto.nombreProducto}`);
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
              <button onClick={() => handleClickCategoria(categoria)}>Haz clic aquí</button>
            </div>
            <div className="main-categoria-imagen">
              <img src={categoria.imagen} alt={categoria.nombre} />
            </div>
          </div>
        ))}
      </div>
      <h1 className="main-title">Lo Más Visto</h1>
      <Carousel>
        {masVistos.map((producto) => (
          <div key={producto._id} className="main-categoria">
            <div className="main-categoria-info">
              <h2>{producto.nombreProducto}</h2>
              <p>{producto.categoria}</p>
              <button onClick={() => handleClickProducto(producto)}>Haz clic aquí</button>
            </div>
            <div className="main-categoria-imagen">
              <img src={producto.url} alt={producto.nombreProducto} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Main;
