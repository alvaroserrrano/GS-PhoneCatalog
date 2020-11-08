import { ADD_TO_CART } from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${productId}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      name: data.name,
      imageFilename: data.imageFilename,
      price: data.price,
      manufacturer: data.manufacturer,
      countInStock: data.countInStock,
      _id: data._id,
      qty,
    },
  });
};
