import React, { useEffect, useState } from 'react';
import { Product } from './Product';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
import '../styles/Home.css';
import axios from 'axios';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setLoading(false);
        setProducts(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
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
                id={product.id}
                name={product.name}
                manufacturer={product.manufacturer}
                price={product.price}
                imageFileName={product.imageFileName}
              ></Product>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
