import React from 'react';

const ProductItem = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio hola: ${product.price.toLocaleString()}</p>
      <p>Categoría: {product.category}</p>
      {product.images.map((img, idx) => (
        <img key={idx} src={img.startsWith('//') ? 'https:' + img : img} alt={`Imagen de producto ${idx + 1}`} className="product-image" />
      ))}
    </div>
  );
};

export default ProductItem;
