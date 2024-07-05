// src/components/ProductDetails.js

import React from 'react';

const TablaIzquierda = ({ images }) => {
  return (
    <div className="tabla_izquierda">
      {images.map((img, idx) => (
        <img key={idx} src={img.startsWith('//') ? 'https:' + img : img} alt={`Imagen de producto ${idx + 1}`} />
      ))}
    </div>
  );
};

const TablaMedia = ({ product }) => {
  const { description, price, category, specifications } = product;

  return (
    <div className="tabla_media">
      <h2>{product.name}</h2>
      <div>
        <h2>Características</h2>
        <table>
          <tbody>
            <tr>
              <td>Descripción</td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>Precio</td>
              <td>${price.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Categoría</td>
              <td>{category}</td>
            </tr>
            {Object.entries(specifications).map(([key, value], idx) => (
              <tr key={idx}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Derecha = ({ url, onBack }) => {
  return (
    <div className="cubo_tiendas_funciones">
      <button onClick={onBack}>Volver</button>
      <div className="Tienda">
        <ul>
          <li>
            <button onClick={() => window.open(url, '_blank')}>Ver producto</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ProductDetalles = ({ product, onBack }) => {
  return (
    <div className="container">
      <div className="body">
        <TablaMedia product={product} />
        <TablaIzquierda images={product.images} />
        <Derecha url={product.url} onBack={onBack} />
      </div>
    </div>
  );
};

export default ProductDetalles;
