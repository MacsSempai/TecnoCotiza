import React from 'react';
import '../css/Hoja_producto.css';

const ProductItem = ({ product, onClick, isSelected }) => {
  return (
    <div
      className={`product-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(product)}
    >
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price.toLocaleString()}</p>
      <p>Categoría: {product.category}</p>
      {product.imagess.length > 0 && ( 
        <img
          src={product.imagess[0].startsWith('//') ? 'https:' + product.imagess[0] : product.imagess[0]}
          alt={`Imagen de producto ${product.name}`}
          className="product-imagess"
        />
      )}
    </div>
  );
};

export default ProductItem;
