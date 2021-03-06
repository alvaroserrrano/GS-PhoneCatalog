import {
  ADD_TO_CART,
  SAVE_SHIPPING_ADDRESS,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${productId}`);
  // console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      name: data.name,
      imageFileName: data.imageFileName,
      price: data.price,
      manufacturer: data.manufacturer,
      countInStock: data.countInStock,
      _id: data._id,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
};
