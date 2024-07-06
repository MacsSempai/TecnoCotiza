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
      {product.images.length > 0 && ( 
        <img
          src={product.images[0].startsWith('//') ? 'https:' + product.images[0] : product.images[0]}
          alt={`imagesn de producto ${product.name}`}
          className="product-images"
        />
      )}
    </div>
  );
};

export default ProductItem;
