import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data';
import '../styles/Product.css';
export const ProductPage = (props) => {
  const product = data.products.find(
    (x) => x._id === parseInt(props.match.params.id)
  );
  const {
    name,
    manufacturer,
    description,
    color,
    price,
    screen,
    ram,
    imageFileName,
  } = product;
  return (
    <div>
      <div className='back__home'>
        <Link to='/'>Back Home</Link>
      </div>
      <div className='details'>
        <div className='details__image'>
          <img src={imageFileName} alt='' />
        </div>
        <div className='details__info'>
          <ul>
            <li>
              <h4>{name}</h4>
            </li>
            <li>
              <b>{manufacturer}</b>
            </li>
            <li>
              Price: <b>{price}</b>
            </li>
            <li>
              Description:
              <div>{description}</div>
              <div>Ram: {ram}</div>
              <div>Screen: {screen}</div>
              <div>Color: {color}</div>
            </li>
            <li>
              <button className='button__primary'>Add to Cart</button>
            </li>
          </ul>
        </div>
        <div className='details__action'>
          <ul>
            <li>Price:{price}</li>
            <li>
              Quantity:{' '}
              <select name='' id=''>
                <option value=''>1</option>
                <option value=''>2</option>
                <option value=''>3</option>
                <option value=''>4</option>
                <option value=''>5</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
