import React from 'react';
import '../styles/Product.css';
import { Link } from 'react-router-dom';
export const Product = ({
  _id,
  name,
  price,
  manufacturer,
  imageFileName,
  ram,
  screen,
  description,
  rating,
  numReviews,
}) => {
  return (
    <div>
      <div className='product'>
        <div className='product__info'>
          <Link to={'/product/' + _id} className='product__name'>
            {name}
          </Link>
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
        <img src={imageFileName} className='product__image' alt='' />
      </div>
    </div>
  );
};
