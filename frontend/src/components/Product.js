import React from 'react';
import '../styles/Product.css';
export const Product = ({
  name,
  price,
  manufacturer,
  imageFileName,
  addToCart,
}) => {
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{name}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(manufacturer)
            .fill()
            .map((_, i) => (
              <p>&#11088;</p>
            ))}
        </div>
      </div>
      <img src={imageFileName} alt='' />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};
