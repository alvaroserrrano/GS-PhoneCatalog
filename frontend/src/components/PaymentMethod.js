import React, { useState } from 'react';
import { CheckoutSteps } from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
export const PaymentMethod = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form action='' onSubmit={handleSubmit} className='form'>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input
              type='radio'
              name='paypal'
              id='paypal'
              value='Paypal'
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='paypal'>Paypal</label>
          </div>
          {/* <div>
            <input
              type='radio'
              name='stripe'
              id='stripe'
              value='Stripe'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='stripe'>Stripe</label>
          </div> */}
        </div>
        <div>
          <button className='button__primary' type='submit'>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
