import React, { useEffect } from 'react';
import { Product } from './Product';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
import '../styles/Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';

export const Home = () => {
  const productsList = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { products, loading, error } = productsList;
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className='home'>
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='home__container'>
          {/* <img
          className='home__image'
          src='https://cdn.pixabay.com/photo/2016/05/27/08/51/mobile-phone-1419275__340.jpg'
          alt=''
        /> */}
          <div className='home__row'>
            {products.map((product) => (
              <Product
                _id={product._id}
                name={product.name}
                manufacturer={product.manufacturer}
                price={product.price}
                imageFileName={product.imageFileName}
                ram={product.ram}
                description={product.description}
                screen={product.screen}
                color={product.color}
                rating={product.rating}
                numReviews={product.numReviews}
              ></Product>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
