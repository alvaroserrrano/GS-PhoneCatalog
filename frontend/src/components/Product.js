import React from 'react';
import '../styles/Product.css';
export const Product = ({ title, price, rating, image, addToBasket }) => {
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#11088;</p>
            ))}
        </div>
      </div>
      <img src={image} alt='' />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};
