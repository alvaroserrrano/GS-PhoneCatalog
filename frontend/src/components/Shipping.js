import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutSteps } from './CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
export const Shipping = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = userLogin;
  if (!userInfo) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, zipCode, country })
    );
    props.history.push('/payment');
  };
  //handle form fields
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [country, setCountry] = useState(shippingAddress.country);
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form action='' className='form' onSubmit={handleSubmit}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor='fullName'>Full Name</label>
          <input
            type='text'
            name='fullName'
            id='fullName'
            placeholder='Full Name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            id='address'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            id='city'
            placeholder='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='zipCode'>Zip Code</label>
          <input
            type='text'
            name='zipCode'
            id='zipCode'
            placeholder='ZIP Code'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            id='country'
            placeholder='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor=''></label>
          <button className='button__primary' type='submit'>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
