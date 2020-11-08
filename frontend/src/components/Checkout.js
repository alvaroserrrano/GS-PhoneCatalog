import React from 'react';
import '../styles/Checkout.css';
import { Subtotal } from './Subtotal';
export const Checkout = () => {
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <div>
          <h3>Hello, user</h3>
          <h2 className='checkout__title'>Your Shopping Cart</h2>
          {/* CheckoutProduct */}
          {/* {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))} */}
        </div>
      </div>
      <div className='checkout__right'>
        <Subtotal></Subtotal>
      </div>
    </div>
  );
};
