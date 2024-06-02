import React, { useState } from 'react';
import './Cotizacion.css';

const Cotizacion = () => {
  const [productos, setProductos] = useState([
    { categoria: 'Tarjeta de Video', src: 'link_del_producto', tienda_producto: 'tienda_producto' },
    { categoria: 'Procesador', src: 'link_del_producto',  tienda_producto: 'tienda_producto' },
    { categoria: 'Placa Madre', src: 'link_del_producto',  tienda_producto: 'tienda_producto' },
    { categoria: 'Disco Duro', src: 'link_del_producto' ,tienda_producto: 'tienda_producto' },
    { categoria: 'Disco SSD', src: 'link_del_producto',  tienda_producto: 'tienda_producto' },
    { categoria: 'Fuente de Poder', src: 'link_del_producto',  tienda_producto: 'tienda_producto' },
    { categoria: 'Gabinete', src: 'link_del_producto' , tienda_producto: 'tienda_producto' },
    { categoria: 'RAM', src: 'link_del_producto',  tienda_producto: 'tienda_producto' },
    { categoria: 'Cooler CPU', src: 'link_del_producto' , tienda_producto: 'tienda_producto' },
  ]);

  const eliminarProducto = (index) => {
    const newProductos = [...productos];
    newProductos[index].link_del_producto = null;
    newProductos[index].tienda_producto = null;
    setProductos(newProductos);
  };

  return (
    <div>
      {productos.map((producto, index) => (
        <div className='.miClasePadre'>
          <div className='contenedor' key={index}>
            <h2 className='categoria'>{producto.categoria}</h2>
            <div className='botones'>
              <select onChange={(e) => window.location.href = e.target.value}>
                <option value="">Selecciona un producto</option>
                {producto.link_del_producto && <option value={producto.link_del_producto}>Ir al producto</option>}
              </select>
              <button className='boton buttonCotizacion' onClick={() => window.location.href = producto.link_del_producto}>Ir al producto</button>
              <select onChange={(e) => window.location.href = e.target.value}>
                <option value="">Selecciona una tienda</option>
                {producto.tienda_producto && <option value={producto.tienda_producto}>Ir a la tienda</option>}
              </select>
              <button className='boton buttonCotizacion' onClick={() => window.location.href = producto.tienda_producto}>Ir a la tienda</button>
              <button className='rojo buttonCotizacion' onClick={() => eliminarProducto(index)}>Eliminar producto</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cotizacion;