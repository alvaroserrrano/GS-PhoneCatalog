import React from 'react';
import { Product } from './Product';
import '../styles/Home.css';
import data from '../data/data';
export const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        {/* <img
          className='home__image'
          src='https://cdn.pixabay.com/photo/2016/05/27/08/51/mobile-phone-1419275__340.jpg'
          alt=''
        /> */}
        <div className='home__row'>
          {data.products.map((product) => (
            <Product
              id={product.id}
              name={product.name}
              manufacturer={product.manufacturer}
              price={product.price}
              imageFileName={product.imageFileName}
            ></Product>
          ))}
        </div>
      </div>
    </div>
  );
};
